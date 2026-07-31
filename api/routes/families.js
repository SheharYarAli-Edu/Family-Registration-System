const express = require('express');
const router = express.Router();
const Family = require('../models/Family');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, authorize('super_admin'), async (req, res) => {
  try {
    const families = await Family.find().populate('headUser', 'name email');
    res.status(200).json({
      success: true,
      count: families.length,
      data: families
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const family = await Family.findById(req.params.id).populate('headUser', 'name email');
    
    if (!family) {
      return res.status(404).json({ success: false, message: 'Family not found' });
    }

    if (req.user.role !== 'super_admin' && 
        req.user.familyId?.toString() !== family._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({
      success: true,
      data: family
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { familyName, headName, email, phone, address, subFamilies } = req.body;

    const existingFamily = await Family.findOne({ familyName });
    if (existingFamily) {
      return res.status(400).json({ success: false, message: 'Family already exists' });
    }

    const family = await Family.create({
      familyName,
      headName,
      headUser: req.user.id,
      email,
      phone,
      address,
      subFamilies: subFamilies || []
    });

    await User.findByIdAndUpdate(req.user.id, { familyId: family._id });

    res.status(201).json({
      success: true,
      data: family
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    let family = await Family.findById(req.params.id);
    
    if (!family) {
      return res.status(404).json({ success: false, message: 'Family not found' });
    }

    if (req.user.role !== 'super_admin' && 
        req.user.familyId?.toString() !== family._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    family = await Family.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: family
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/:id/subfamilies', protect, async (req, res) => {
  try {
    const family = await Family.findById(req.params.id);
    
    if (!family) {
      return res.status(404).json({ success: false, message: 'Family not found' });
    }

    if (req.user.role !== 'super_admin' && 
        req.user.familyId?.toString() !== family._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    family.subFamilies.push(req.body);
    await family.save();

    res.status(200).json({
      success: true,
      data: family
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;