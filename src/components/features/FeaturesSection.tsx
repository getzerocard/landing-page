import React from 'react';
// Removed Image import as we'll use divs with background images

interface FeaturesSectionProps {
  className?: string;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ className = '' }) => {
  return (
    <div className={`w-full max-w-[741px] px-4 sm:px-0 mx-auto mt-12 sm:mt-20 md:mt-24 flex flex-col sm:flex-row items-center gap-8 sm:gap-6 ${className}`}>
      {/* Feature 1 */}
      <div className="flex flex-col items-center sm:items-start gap-[3px] w-full sm:w-[207px]">
        <h3 className="w-full font-['SF_Pro_Display'] font-semibold text-[28px] sm:text-[32px] leading-[100%] text-[#1F1F1F] text-center sm:text-left">
        ⚡️ instantly
        </h3>
        <p className="w-full font-['SF_Pro_Display'] font-medium text-[16px] sm:text-[20px] leading-[120%] text-[#919191] text-center sm:text-left">
          spend crypto onchain, no conversion
        </p>
      </div>

      {/* Divider */}
      <div className="w-full sm:w-0 h-0 sm:h-[83.5px] border-t sm:border-t-0 sm:border-l border-gray-200" />

      {/* Feature 2 */}
      <div className="flex flex-col items-center sm:items-start gap-[3px] w-full sm:w-[219px]">
        <h3 className="w-full font-['SF_Pro_Display'] font-semibold text-[28px] sm:text-[32px] leading-[100%] text-[#1F1F1F] text-center sm:text-left">
          clockwork<span className="text-[#40FF00]">*</span>
        </h3>
        <p className="w-full font-['SF_Pro_Display'] font-medium text-[16px] sm:text-[20px] leading-[120%] text-[#919191] text-center sm:text-left">
          24/7 spending, no banking hours
        </p>
      </div>

      {/* Divider */}
      <div className="w-full sm:w-0 h-0 sm:h-[83.5px] border-t sm:border-t-0 sm:border-l border-gray-200" />

      {/* Feature 3 */}
      <div className="flex flex-col items-center sm:items-start gap-[3px] w-full sm:w-[260px]">
        {/* Country Flags Container - Simplified */}
        <div className="flex flex-row items-start p-0 isolation-isolate w-[70px] h-[32px]">
          {/* Nigeria Flag - Div */} 
          <div
            style={{ 
              backgroundImage: `url('/assets/images/Nigeria-logo copy.svg')`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center center'
            }}
            className="w-[32px] h-[32px] bg-white bg-no-repeat box-border flex-none order-0 flex-grow-0 -mr-[13px] z-[2] shadow-[0px_0px_0.217687px_rgba(66,71,76,0.32),0px_1.7415px_2.61225px_rgba(66,71,76,0.08)] rounded-[177.067px]"
            aria-label="Nigeria Flag"
          />
          
          {/* Ghana Flag - Div */}
          <div
            style={{ 
              backgroundImage: `url('/assets/images/Ghana-logo copy.svg')`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center center'
            }}
            className="w-[32px] h-[32px] bg-[#FFDA2C] bg-no-repeat box-border flex-none order-1 flex-grow-0 -mr-[13px] z-[1] shadow-[0px_0px_0.571429px_rgba(66,71,76,0.32),0px_4.57143px_6.85714px_rgba(66,71,76,0.08)] rounded-[464.8px]"
            aria-label="Ghana Flag"
          />
          
          {/* Kenya Flag - Div */}
          <div
            style={{ 
              backgroundImage: `url('/assets/images/Kenya-logo copy.svg')`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center center'
            }}
            className="w-[32px] h-[32px] bg-[#151515] bg-no-repeat box-border flex-none order-2 flex-grow-0 z-[0] shadow-[0px_0px_0.571429px_rgba(66,71,76,0.32),0px_4.57143px_6.85714px_rgba(66,71,76,0.08)] rounded-[464.8px]"
            aria-label="Kenya Flag"
          />
        </div>
        <p className="w-full font-['SF_Pro_Display'] font-medium text-[16px] sm:text-[20px] leading-[120%] text-[#919191] text-center sm:text-left">
          our card works in 150+ countries
        </p>
      </div>
    </div>
  );
};

export default FeaturesSection; 