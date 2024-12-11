import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const RubberDuck = sequelize.define('RubberDuck', {
    name: {
        type: DataTypes.STRING,
    },
    quote: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
});

RubberDuck.sync();

export default RubberDuck;
