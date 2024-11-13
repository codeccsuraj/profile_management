import { logger } from "../logger.js";
import { createGig, deleteGigById, getAllGigs, getGigById, getUserDataAndGigs, updateGigById } from "../services/gigService.js";

const addGig = async (req, res) => {
  try {
    // Extract gig data from the request body
    const gigData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      userId: req.body.userId,
    };

    // Call the service function to create the gig
    const savedGig = await createGig(gigData);

    // If successful, send a 201 response with the saved gig data
    res.status(201).json({
      success: true,
      message: 'Gig created successfully',
      data: savedGig,
    });
  } catch (error) {
    // Log and send a 500 response if an error occurs
    logger.error(`Gig creation failed: ${error.message}`);
    res.status(500).json({
      success: false,
      message: `Gig creation failed: ${error.message}`,
    });
  }
};

const getGigFromId = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID parameter
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID parameter is required.'
      });
    }

    const gig = await getGigById(id);

    // Handle the case when there is no gig are found
    if (!gig) {
      return res.status(404).json({
        success: false,
        message: `Gig not found for ID: ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: `Gig retrieved successfully for ID: ${id}`,
      data: gig
    });
  } catch (error) {
    logger.error(`Get Gig by ID Controller error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
}

const getAllGigData = async (req, res) => {
  try {
    const gigs = await getAllGigs();
    return res.status(200).json({
      success: true,
      message: 'All gigs retrieved successfully',
      data: gigs
    });
  } catch (error) {
    logger.error(`Get All Gigs Controller error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const getUserDataAndGigsController = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await getUserDataAndGigs(userId);

    return res.status(200).json({
      success: true,
      message: `User data and gigs retrieved successfully for user ID: ${userId}`,
      data: result
    });
  } catch (error) {
    logger.error(`Get User Data and Gigs Controller error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateGig = async(req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const updatedGig = await updateGigById(id, updateData);
    if (!updatedGig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    res.status(200).json(updatedGig);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
const deleteGig = async (req, res) => {
  try {
      const { id } = req.params; // Get gig ID from request parameters

      // Call the service function to delete the gig
      await deleteGigById(id);

      // Respond with success message and the deleted gig data
      res.status(200).json({
          message: "Gig deleted successfully.",
      });
  } catch (error) {
      // Log the error and respond with an appropriate error message
      logger.error(`Delete Gig Controller error: ${error.message}`);
      res.status(500).json({
          message: error.message
      });
  }
};
export {
  addGig,
  getGigFromId,
  getAllGigData,
  getUserDataAndGigsController,
  deleteGig,
  updateGig
}