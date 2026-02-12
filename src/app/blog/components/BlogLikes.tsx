'use client';

import { useState, useEffect } from 'react';
import { ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogLikesProps {
  postId: string;
}

export default function BlogLikes({ postId }: BlogLikesProps) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Carregar curtidas do localStorage
    const storedLikes = localStorage.getItem(`blog-likes-${postId}`);
    const storedHasLiked = localStorage.getItem(`blog-liked-${postId}`);
    
    if (storedLikes) {
      setLikes(parseInt(storedLikes));
    }
    if (storedHasLiked === 'true') {
      setHasLiked(true);
    }
  }, [postId]);

  const handleLike = () => {
    if (hasLiked) {
      // Remover curtida
      const newLikes = Math.max(0, likes - 1);
      setLikes(newLikes);
      setHasLiked(false);
      localStorage.setItem(`blog-likes-${postId}`, newLikes.toString());
      localStorage.setItem(`blog-liked-${postId}`, 'false');
    } else {
      // Adicionar curtida
      const newLikes = likes + 1;
      setLikes(newLikes);
      setHasLiked(true);
      setIsAnimating(true);
      localStorage.setItem(`blog-likes-${postId}`, newLikes.toString());
      localStorage.setItem(`blog-liked-${postId}`, 'true');
      
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  return (
    <Button
      variant={hasLiked ? 'default' : 'outline'}
      size="sm"
      onClick={handleLike}
      className={`gap-2 transition-all ${
        hasLiked ? 'bg-primary text-white hover:bg-primary/90' : ''
      } ${isAnimating ? 'scale-110' : ''}`}
    >
      <ThumbsUp 
        className={`h-4 w-4 transition-transform ${
          isAnimating ? 'animate-bounce' : ''
        }`}
        fill={hasLiked ? 'currentColor' : 'none'}
      />
      {likes > 0 ? `${likes} Curtida${likes > 1 ? 's' : ''}` : 'Curtir'}
    </Button>
  );
}
