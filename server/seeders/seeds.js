const userSeeds = require('./userSeed.json');
const foodSeeds = require('./foodSeed.json');
const db = require('../config/connection');
const { Food, User } = require('../models');

db.once('open', async () => {
    try {
        await User.create(userSeeds);

        for (let i = 0; i < foodSeeds.length; i++) {
            const { _id, foodOwner } = await Food.create(foodSeeds[i]);
            const user = await User.findOneAndUpdate(
                { username: foodOwner },
                {
                    $addToSet: {
                        myFoods: _id,
                    },
                }
            );
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
});