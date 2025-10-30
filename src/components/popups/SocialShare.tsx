import React from 'react';
import { Button } from '../buttons/Button';
import { FaXTwitter } from 'react-icons/fa6';

interface SocialShareProps {
  giftType: string;
  onShare?: () => void;
}

export const SocialShare: React.FC<SocialShareProps> = ({ giftType, onShare }) => {
  const handleShare = () => {
    // Format the tweet text
    const tweetText = `I just joined @getzerocard waitlist and I just won ${giftType}, you should join the waitlist also\n\nJoin now: https://getzerocard.xyz/\n\n@BaseWestAfrica @getzerocard`;
    
    // Encode the tweet text for URL
    const encodedText = encodeURIComponent(tweetText);
    
    // Twitter Web Intent URL
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
    
    // Open in new window
    window.open(twitterUrl, '_blank', 'width=550,height=420');
    
    // Call callback if provided
    if (onShare) {
      onShare();
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="font-medium text-sm text-[#919191] text-center">
        Share your win with friends!
      </p>
      <Button
        variant="secondary"
        onClick={handleShare}
        className="w-full flex items-center justify-center gap-2"
      >
        <FaXTwitter size={18} />
        Share on X
      </Button>
    </div>
  );
};

export default SocialShare;

