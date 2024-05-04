import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const Reviews = ({ placeId, userId }) => {
  const [reviews, setReviews] = useState([]); 
  const [newReview, setNewReview] = useState({ rating: '', review: '' });
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [updatedRating, setUpdatedRating] = useState(0);
  const [updatedReviewText, setUpdatedReviewText] = useState('');
  const [editingReviewId, setEditingReviewId] = useState(null);
  
  const {isLoggedIn} = useContext(AuthContext)

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/places/${placeId}/reviews`)
      .then(response => {
        console.log(response)
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  };

  const handleAddReview = () => {
    axios.post(`${import.meta.env.VITE_API_URL}/api/places/${placeId}/reviews`, newReview,{
      headers:{
        Authorization: "Bearer " + localStorage.getItem("authToken")
       }
    })
      .then(response => {
        setReviews([...reviews, response.data]);
        setNewReview({ rating: '', review: '' });
        setShowAddReviewModal(false); 
      })
      .catch(error => {
        console.error('Error adding review:', error);
      });
  };
  

  const handleEditReview = (reviewId) => {
    const reviewToEdit = reviews.find(review => review._id === reviewId);
    
    if (reviewToEdit && isLoggedIn && userId === reviewToEdit.user._id) {
      const updatedReview = { rating: updatedRating, review: updatedReviewText };
      axios.put(`${import.meta.env.VITE_API_URL}/api/places/${placeId}/reviews/${reviewId}`, updatedReview)
        .then(response => {
          setReviews(reviews.map(review => review._id === reviewId ? response.data : review));
          setEditingReviewId(null); // Clear editing state after successful edit
        })
        .catch(error => {
          console.error('Error editing review:', error);
        });
    } else {
      console.error('You are not authorized to edit this review.');
    }
  };
  
  const handleDeleteReview = (reviewId) => {
    if (isLoggedIn) {
      axios.delete(`${import.meta.env.VITE_API_URL}/api/places/${placeId}/reviews/${reviewId}`)
        .then(() => {
          setReviews(reviews.filter(review => review._id !== reviewId));
        })
        .catch(error => {
          console.error('Error deleting review:', error);
        });
    } else {
      console.error('You are not authorized to delete this review.');
    }
  };
  

  const openAddReviewModal = () => {
    if (isLoggedIn) {
        console.log(isLoggedIn)
      setShowAddReviewModal(true);
    } else {
      alert('Please log in to add a review');
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return sum / reviews.length;
  };

  const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} style={{ color: 'yellow' }}>★</span>);
      } else {
        stars.push(<span key={i}>★</span>);
      }
    }
    return <div>{stars}</div>;
  };
  
  return (
    <div>
      <h2>Reviews</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
  <p style={{ marginRight: '10px' }}>{calculateAverageRating().toFixed(1)}</p>
  <StarRating rating={calculateAverageRating()} />
  <p style={{ marginLeft: '10px' }}>{reviews.length} reviews</p>
</div>
      {isLoggedIn && (
        <div>
          <button onClick={openAddReviewModal}>Add Review</button>
        </div>
      )}

      <ul style={{ listStyleType: 'none' }}>
        {reviews.map(review => (
          <li key={review._id}>
            <StarRating rating={review.rating} />
            <p>{review.review}</p>
            {isLoggedIn && userId === review.user._id && (
              <div>
                {editingReviewId === review._id ? (
                  <>
                    <input
                      type="number"
                      placeholder="New Rating"
                      value={updatedRating}
                      onChange={e => setUpdatedRating(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="New Review Text"
                      value={updatedReviewText}
                      onChange={e => setUpdatedReviewText(e.target.value)}
                    />
                    <button onClick={() => handleEditReview(review._id)}>Submit</button>
                    <button onClick={() => setEditingReviewId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingReviewId(review._id)}>Edit</button>
                    <button onClick={() => handleDeleteReview(review._id)}>Delete</button> 
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
   
      {showAddReviewModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Review</h3>
            <input
              type="number"
              placeholder="Rating"
              value={newReview.rating}
              onChange={e => setNewReview({ ...newReview, rating: e.target.value })}
            />
            <input
              type="text"
              placeholder="Review"
              value={newReview.review}
              onChange={e => setNewReview({ ...newReview, review: e.target.value })}
            />
            <button onClick={handleAddReview}>Add Review</button>
            <button onClick={() => setShowAddReviewModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;



