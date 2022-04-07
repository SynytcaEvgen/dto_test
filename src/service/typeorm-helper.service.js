"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const moment = require("moment");
const merge = require("lodash.merge");
const utils_1 = require("./utils");
class TypeormHelper {
    constructor(connection) {
        this.connection = connection;
        this.NUMBER_COMPARISON_OPERATORS = [
            'ge',
            'gt',
            'eq',
            'ne',
            'lt',
            'le',
            'be',
        ];
        this.NUMBER_COLUMN_TYPES = [
            'int',
            'double',
            'float',
            'real',
            'bigint',
            'fixed',
            'decimal',
            'double precision',
            'integer',
            'float4',
            'float8',
            'int64',
            'int2',
            'int4',
            'int8',
            'smallint',
            'smalldecimal',
            'tinyint',
            'smalldecimal',
            'number',
            'numeric',
            Number,
        ];
        this.STRING_COLUMN_TYPES = [
            String,
            'string',
            'text',
            'character varying',
            'char varying',
            'tinytext',
            'char',
            'varchar',
            'varying character',
        ];
    }
    async getEntityInstance(entity, options) {
        const instance = await this.connection
            .getRepository(entity)
            .findOne(options);
        if (!instance) {
            throw new common_1.NotFoundException(`${entity.name} not found!`);
        }
        return instance;
    }
    async getEntitiesList(entity, options, { dateBounds, options: filterOptions, order, limit, skip, fields, }) {
        if (!options.skip && skip) {
            options.skip = skip;
        }
        if (!options.take && limit) {
            options.take = limit;
        }
        const findOptions = this.prepareSearchOptions(entity, options, {
            dateBounds,
            options: filterOptions,
            order,
            fields,
        });
        const [items, count] = await this.connection
            .getRepository(entity)
            .findAndCount(findOptions);
        return {
            items,
            count,
        };
    }
    async simpleUpdate(entity, options, updateDto) {
        const instance = await this.getEntityInstance(entity, options);
        return this.connection.manager.save(this.connection.manager.merge(entity, instance, updateDto));
    }
    prepareSearchOptions(entity, options, { dateBounds, order, options: searchOptions, fields } = {}) {
        const { ownColumns: columns, relations } = this.connection.getMetadata(entity);
        let foundColumn;
        let findOperator;
        if (searchOptions) {
            if (!options.where) {
                options.where = {};
            }
            for (const key of Object.keys(searchOptions)) {
                if (typeof options.where === 'object' && key in options.where) {
                    continue;
                }
                foundColumn = columns.find(x => x.propertyName === key);
                if (!foundColumn) {
                    throw new common_1.BadRequestException(`Property ${key} does not exist for options`);
                }
                if (this.STRING_COLUMN_TYPES.includes(foundColumn.type)) {
                    findOperator = new typeorm_1.FindOperator('ilike', `%${searchOptions[key]}%`);
                    options.where[key] = findOperator;
                }
                else if (foundColumn.type === 'enum') {
                    if (!foundColumn.enum.includes(searchOptions[key])) {
                        throw new common_1.BadRequestException(`Enum for option '${key}' allow only these values: ${foundColumn.enum.join(', ')}`);
                    }
                    options.where[key] = searchOptions[key];
                }
                else if (foundColumn.type === 'uuid') {
                    if (!class_validator_1.isUUID(searchOptions[key])) {
                        throw new common_1.BadRequestException(`Option ${key} must be a valid uuid`);
                    }
                    options.where[key] = searchOptions[key];
                }
                else if (this.NUMBER_COLUMN_TYPES.includes(foundColumn.type)) {
                    if (typeof searchOptions[key] === 'object') {
                        for (const operator of Object.keys(searchOptions[key])) {
                            const n = typeof searchOptions[key] === 'object' && operator === 'be'
                                ? searchOptions[key][operator]
                                : parseFloat(searchOptions[key][operator]);
                            if (!this.NUMBER_COMPARISON_OPERATORS.includes(operator) ||
                                Number.isNaN(n)) {
                                continue;
                            }
                            options.where[key] = this.parseNumberComparison(operator, n, foundColumn.databaseName);
                        }
                    }
                    else {
                        const n = parseFloat(searchOptions[key]);
                        if (isNaN(n)) {
                            continue;
                        }
                        options.where[key] = this.createNumberEqualsOperator(foundColumn.databaseName, n);
                    }
                }
                else if (['bool', 'boolean'].includes(foundColumn.type)) {
                    const condition = ['false', '0'].includes(searchOptions[key])
                        ? false
                        : Boolean(searchOptions[key]);
                    options.where[key] = condition;
                }
            }
        }
        if (fields) {
            if (!options.select) {
                options.select = [];
            }
            if (!options.relations) {
                options.relations = [];
            }
            let foundRelation;
            for (const field of fields) {
                foundColumn = columns.find(x => x.propertyName === field);
                if (foundColumn && !options.select.includes(field)) {
                    options.select.push(field);
                    continue;
                }
                if (!foundColumn) {
                    foundRelation = relations.find(x => x.propertyName === field);
                    if (foundRelation && !options.relations.includes(field)) {
                        options.relations.push(field);
                        continue;
                    }
                }
            }
        }
        if (dateBounds) {
            let lowerBound;
            let upperBound;
            if (dateBounds.lower) {
                lowerBound = moment(dateBounds.lower);
                if (!lowerBound.isValid()) {
                    throw new common_1.BadRequestException('Wrong lower date bound parameter');
                }
            }
            if (dateBounds.upper) {
                upperBound = moment(dateBounds.upper);
                if (!upperBound.isValid()) {
                    throw new common_1.BadRequestException('Wrong lower date bound parameter');
                }
                const upperBoundTime = `${upperBound.hour()}:${upperBound.minute()}:${upperBound.second()}`;
                if (upperBoundTime === '0:0:0') {
                    upperBound.add(1, 'd');
                }
            }
            if (lowerBound && upperBound) {
                options.where.createdAt = typeorm_1.Between(utils_1.convertDateToPostgresFormat(lowerBound), utils_1.convertDateToPostgresFormat(upperBound));
            }
            else if (lowerBound) {
                options.where.createdAt = typeorm_1.MoreThanOrEqual(utils_1.convertDateToPostgresFormat(lowerBound));
            }
            else if (upperBound) {
                options.where.createdAt = typeorm_1.LessThanOrEqual(utils_1.convertDateToPostgresFormat(lowerBound));
            }
        }
        if (order) {
            for (const key of Object.keys(order)) {
                foundColumn = columns.find(x => x.propertyName === key);
                if (!foundColumn) {
                    throw new common_1.BadRequestException(`Property ${key} does not exist for order`);
                }
                order[key] =
                    typeof order[key] === 'string'
                        ? order[key].toUpperCase()
                        : order[key];
            }
            if (!options.order) {
                if (!('createdAt' in order)) {
                    options.order = Object.assign(Object.assign({}, order), { createdAt: 'DESC' });
                }
                else {
                    options.order = order;
                }
            }
            else {
                options.order = merge(options.order, order);
            }
        }
        if (!options.order) {
            options.order = {
                createdAt: 'DESC',
            };
        }
        if (options.select && !options.select.includes('createdAt')) {
            options.select.push('createdAt');
        }
        return options;
    }
    parseNumberComparison(operator, value, columnName = '') {
        let condition;
        switch (operator) {
            case 'eq':
                condition = this.createNumberEqualsOperator(columnName, value);
                break;
            case 'ne':
                condition = typeorm_1.Not(this.createNumberEqualsOperator(columnName, value));
                break;
            case 'gt':
                condition = typeorm_1.MoreThan(value);
                break;
            case 'ge':
                condition = typeorm_1.MoreThanOrEqual(value);
                break;
            case 'lt':
                condition = typeorm_1.LessThan(value);
                break;
            case 'le':
                condition = typeorm_1.LessThanOrEqual(value);
                break;
            case 'be':
                const lower = parseFloat(value.lower);
                const upper = parseFloat(value.upper);
                if (!isNaN(lower) && !isNaN(upper)) {
                    condition = typeorm_1.Between(lower, upper);
                }
                break;
        }
        return condition;
    }
    createNumberEqualsOperator(columnName, n) {
        if (this.connection.options.type !== 'postgres') {
            return typeorm_1.Equal(n);
        }
        const floatingDigitsCount = (`${n}`.split('.')[1] || '').length;
        if (floatingDigitsCount === 0) {
            return typeorm_1.Equal(n);
        }
        const findOperator = typeorm_1.Raw(aliasPath => `round("${aliasPath}"::numeric, ${floatingDigitsCount}) = :n`, { n });
        return findOperator;
    }
}
exports.TypeormHelper = TypeormHelper;
//# sourceMappingURL=typeorm-helper.service.js.map