const Rating = require('../models/Ratings.model');

// Function to calculate average rating
const calculateAverageRating = async (vendorId, excludeRatingId) => {
  const ratings = await Rating.find({ vendorId: vendorId, _id: { $ne: excludeRatingId } });
  const sum = ratings.reduce((acc, item) => acc + item.rating, 0);
  return ratings.length ? ((sum / ratings.length).toFixed(2)) : 0;
};
const calculateProductAverageRating = async (productId, excludeRatingId) => {
  const ratings = await Rating.find({ productId: productId, _id: { $ne: excludeRatingId } });
  const sum = ratings.reduce((acc, item) => acc + item.rating, 0);
  return ratings.length ? ((sum / ratings.length).toFixed(2)) : 0;
};
// Controller function to submit a new rating
const submitRating = async (req, res) => {
  const vendorId = req.params.vendorId;
  const { rating, customerId } = req.body;

  try {
    // Check if the user has already submitted a rating
    const existingRating = await Rating.findOne({ vendorId: vendorId, customerId: customerId });

    if (existingRating) {
      // User has already submitted a rating, update the existing rating
      existingRating.rating = rating;
      await existingRating.save();
    } else {
      // This is a new rating from the user
      const newRating = new Rating({ vendorId, rating, customerId });
      await newRating.save();

    }

    // Calculate the new average rating
    const averageRating = await calculateAverageRating(vendorId);

    // Return the new average rating
    res.json({ averageRating:averageRating,userRating:existingRating.rating});
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).send('Error submitting rating');
  }
};

// Controller function to get the average rating
// Controller function to get the average rating
exports.getAverageRating = async (req, res) => {
  const vendorId = req.params.vendorId;

  try {
    // Fetch all ratings for the vendor
    const ratings = await Rating.findOne({ vendorId:vendorId});
    // Calculate the average rating
    const averageRating = await calculateAverageRating(vendorId);

    // Return the average rating
    res.json({ averageRating:averageRating.toFixed(2) });
  } catch (error) {
    console.error('Error fetching average rating:', error);
    res.status(500).send('Error fetching average rating');
  }
};


const getuserating = async (req, res) => {
  try {
    const { vendorId, customerId } = req.params;
    const rating = await Rating.findOne({ vendorId, customerId });
    if (!rating) {
      return res.status(404).send({ error: 'Rating not found' });
    }
    
    res.send({ ratingId: rating._id, rating: rating.rating });
  } catch (error) {
    res.status(500).send(error);
  }
};




const getRating = async (req, res) => {
  try {
    const { productId, customerId } = req.params;
    const rating = await Rating.findOne({ productId: productId, customerId: customerId });
    if (!rating) {
      return res.status(404).send({ error: 'Rating not found' });
    }
    res.send(rating);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createRating = async (req, res) => {
  const productId = req.params.productId;
  const { rating, customerId,vendorId } = req.body;

  try {
    // Check if the user has already submitted a rating
    const existingRating = await Rating.findOne({ productId: productId, customerId: customerId,vendorId:vendorId });
var newRating2;
    if (existingRating) {
      // User has already submitted a rating, update the existing rating
      existingRating.rating = rating;
      
      console.log(existingRating.customerId)

      await existingRating.save();
    } else {
      // This is a new rating from the user
      const newRating = new Rating({ productId, rating, customerId,vendorId });
      await newRating.save();
      console.log("saved new rating")

    }

    // Calculate the new average rating
    const averageRating = await calculateProductAverageRating(productId);

    // Return the new average rating
    //res.send(existingRating)
    res.json({ averageRating:averageRating,userRating: existingRating ? existingRating.rating : null,message:existingRating });
   
    
   
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).send('Error submitting rating');
  }
};

const updateRating = async (req, res) => {
  const { vendorId, productId } = req.params;
  const { rating } = req.body;

  try {
    // Check if a rating already exists for this vendor and product
    let existingRating = await Rating.findOne({ vendorId, productId });

    if (!existingRating) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    // Update the existing rating
    existingRating.rating = rating;
    await existingRating.save();

    res.status(200).json({ message: 'Rating updated successfully' });
  } catch (error) {
    console.error('Error updating rating:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteRating = async (req, res) => {
  const { vendorId, productId } = req.params;

  try {
    // Find and delete the rating for the specified vendor and product
    const deletedRating = await Rating.findOneAndDelete({ vendorId, productId });

    if (!deletedRating) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    res.status(200).json({ message: 'Rating deleted successfully' });
  } catch (error) {
    console.error('Error deleting rating:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAverageRating = async (req, res) => {
  const { vendorId } = req.params;

  try {
    // Find all ratings for the specified vendor
    const ratings = await Rating.find({ vendorId });

    if (ratings.length === 0) {
      return res.status(404).json({ message: 'No ratings found for this vendor' });
    }

    // Calculate the average rating
    const totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRating / ratings.length;

    res.status(200).json({ averageRating });
  } catch (error) {
    console.error('Error calculating average rating:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




const getProductAverageRating = async (req, res) => {
  const { productId } = req.params;

  try {
    // Find all ratings for the specified vendor
    const ratings = await Rating.find({ productId });

    if (ratings.length === 0) {
      return res.status(404).json({ message: 'No ratings found for this vendor' });
    }

    // Calculate the average rating
    const totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRating / ratings.length;

    res.status(200).json({ averageRating });
  } catch (error) {
    console.error('Error calculating average rating:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {getProductAverageRating, calculateProductAverageRating, getRating, createRating, updateRating, deleteRating, getAverageRating, submitRating, getuserating };
