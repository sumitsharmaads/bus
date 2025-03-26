import React from "react";
import { Card, CardContent, CardMedia, Typography, Chip } from "@mui/material";

interface DestinationCardProps {
  title: string;
  description: string;
  image: string;
}

export const HomePlaceCard: React.FC<DestinationCardProps> = ({
  title,
  description,
  image,
}) => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  return (
    <Card
      className="flex flex-row items-center p-1 shadow-md border border-gray-200 hover:shadow-lg transition duration-300 cursor-pointer"
      sx={{ borderRadius: 2 }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        className="w-20 h-20 object-cover rounded-md max-w-20"
      />
      <CardContent className="flex flex-col ml-1 p-0">
        <h3 className="text-[20.65px] font-[600] leading-[30.98px]  font-['Poppins']">
          {title}
        </h3>
        <p className="text-gray-600">{truncateText(description, 40)}</p>
      </CardContent>
    </Card>
  );
};
