const express = require('express');
const { celebrate } = require('celebrate');
const slugify = require('slugify');
const { Club } = require('../../models');
const { authenticateRequest, authorizeRequest } = require('../middleware');
const logger = require('../../lib/logger');
const {
  clubSchemas: { clubCreationSchema },
} = require('../schemas');

const router = express.Router();

const slugifyOptions = {
  lower: true,
  replacement: '-',
  remove: undefined,
  strict: false,
};

// Public Route to see all clubs - non-logged in users can still access this endpoint
router.get('/clubs', async (req, res) => {
  try {
    const clubs = await Club.find().exec();
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// only admins can create a club
// we will assume it's just the club owner or coach
router.post(
  '/clubs',
  [authenticateRequest, authorizeRequest],
  celebrate({ body: clubCreationSchema }),
  async (req, res) => {
    try {
      const club = req.body;
      const slug = slugify(club.name, slugifyOptions);
      const existingClub = await Club.findOne({ name: slug });

      if (existingClub) {
        res.status(422).json({ error: `Club with name: ${club.name} already exists` });
      } else {
        const newClub = new Club(club);
        await newClub.save();

        logger.info(`New club created: ${JSON.stringify(newClub)}`);
        res.status(201).json(newClub);
      }
    } catch (error) {
      logger.error(`error while creating a club: ${error.message}`);
      res.status(201).json({ error: error.message });
    }
  },
);

module.exports = router;
