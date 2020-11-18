'use strict';

const models = require('../models');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        const usersQuery = await models.User.findAll();
        const products = [
            {
                userId: 1,
                name: 'TV',
                pret: 2000,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 2,
                name: 'PC',
                pret: 3000,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            { userId: 2, name: 'Cablu', pret: 50, createdAt: new Date(), updatedAt: new Date() },
        ];
        await queryInterface.bulkInsert('Products', products, {});
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
