import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import Journal from '../models/journalModel.js';

/**
 * @desc    Create a new journal entry
 * @route   POST /api/journals
 * @access  Private
 */
const createJournal = asyncHandler(async (req, res) => {
  const { title, content, category, date, userId } = req.body;

  const newJournal = await Journal.create({
    title,
    content,
    category,
    date,
    userId,
  });

  res.status(201).json(newJournal);
});

/**
 * @desc    Get all journal entries
 * @route   GET /api/journals
 * @access  Public
 */
const getJournals = asyncHandler(async (req, res) => {
  const { search } = req.query;
  let whereCondition = {};

  if (search) {
    whereCondition = {
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { category: { [Op.like]: `%${search}%` } },
      ],
    };
  }

  const journals = await Journal.findAll({
    where: whereCondition,
    order: [['date', 'DESC']],
  });

  res.json(journals);
});

/**
 * @desc    Get journal entries for a specific user by user ID
 * @route   GET /api/journals/myjournals/:userId
 * @access  Private
 */
const getJournalsByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const journals = await Journal.findAll({
    where: { userId },
    order: [['date', 'DESC']],
  });

  if (journals.length > 0) {
    res.json(journals);
  } else {
    res.status(404).json({ message: 'No journal entries found for this user' });
  }
});

/**
 * @desc    Get a single journal entry by ID
 * @route   GET /api/journals/:id
 * @access  Private
 */
const getJournalById = asyncHandler(async (req, res) => {
  const journal = await Journal.findByPk(req.params.id);

  if (journal && journal.userId === req.user.id) {
    res.json(journal);
  } else {
    res.status(404).json({ message: 'Journal entry not found' });
  }
});

/**
 * @desc    Update a journal entry
 * @route   PUT /api/journals/:id
 * @access  Private
 */
const updateJournal = asyncHandler(async (req, res) => {
  const { title, content, category, date } = req.body;

  const journal = await Journal.findByPk(req.params.id);

  if (journal) {
    journal.title = title || journal.title;
    journal.content = content || journal.content;
    journal.category = category || journal.category;
    journal.date = date || journal.date;

    const updatedJournal = await journal.save();

    res.json(updatedJournal);
  } else {
    res.status(404).json({ message: 'Journal entry not found' });
  }
});

/**
 * @desc    Delete a journal entry
 * @route   DELETE /api/journals/:id
 * @access  Private
 */
const deleteJournal = asyncHandler(async (req, res) => {
  const journal = await Journal.findByPk(req.params.id);

  if (journal) {
    await journal.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Journal entry not found' });
  }
});

export {
  createJournal,
  getJournals,
  getJournalsByUserId,
  getJournalById,
  updateJournal,
  deleteJournal,
};
