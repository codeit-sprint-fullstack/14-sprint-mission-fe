"use client";
import { useState } from "react";
import { useAuth } from "./authProvider";

type FavoriteButton = {
  productId: number;
  initialIsFavorite: boolean;
  initialFavoriteCount: number;
};

export const FavoriteButton = ({
  productId,
  initialIsFavorite,
  initialFavoriteCount,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [favoriteCount, setFavoriteCount] = useState(initialFavoriteCount);
  const { accessToken } = useAuth();

  const handleClick = async () => {
    console.log("토큰확인", accessToken);
    const method = isFavorite ? "DELETE" : "POST";

    await fetch(
      `https://panda-market-api.vercel.app/products/${productId}/favorite`,
      {
        method: method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    setIsFavorite(!isFavorite);
    setFavoriteCount(isFavorite ? favoriteCount - 1 : favoriteCount + 1);
  };

  return <button onClick={handleClick}>♥ {favoriteCount}</button>;
};

export default FavoriteButton;
