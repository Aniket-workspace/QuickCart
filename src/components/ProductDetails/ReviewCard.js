import React from "react";
import { Card, Typography, Box, Avatar, Rating } from "@mui/material";

const ReviewCard = ({ reviewInfo }) => {
  const toDateFormate = (prevDate) => {
    const date = new Date(prevDate);

    // Format it as a readable date and time
    const formattedDate = date.toLocaleString("en-US", {
      weekday: "long", // Full weekday name
      year: "numeric", // Full year
      month: "long", // Full month name
      day: "numeric", // Day of the month
      hour: "2-digit", // 2-digit hour
      minute: "2-digit", // 2-digit minute
      hour12: true, // Use 12-hour clock (AM/PM)
    });

    return formattedDate;
  };

  return (
    <>
      {reviewInfo.map((review, index) => {
        const initials = review.reviewerName.split(" ");
        return (
          <Card
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              mb: 1,
              boxShadow: 2,
              borderRadius: 1,
              bgcolor: "background.paper",
            }}
          >
            <Avatar
              alt={review.reviewerName}
              sx={{ width: 40, height: 40, mr: 2, backgroundColor: "#ff6f61" }}
            >{`${initials[0].charAt(0)}${initials[1].charAt(0)}`}</Avatar>
            <Box sx={{ flexGrow: 1, color: "#655967" }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {review.reviewerName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {toDateFormate(review.date)}
              </Typography>
              <Rating
                value={review.rating}
                readOnly
                precision={0.5}
                size="small"
                sx={{ mt: 0.5 }}
              />
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {review.comment}
              </Typography>
            </Box>
          </Card>
        );
      })}
    </>
  );
};

export default ReviewCard;
