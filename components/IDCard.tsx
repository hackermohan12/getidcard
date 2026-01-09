
import React, { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { IDCardState, IDTheme } from '../types';

interface IDCardProps {
  data: IDCardState;
  side: 'front' | 'back';
}

const hexToRgba = (hex: string, alpha: number) => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return hex;
};

export const IDCard = forwardRef<HTMLDivElement, IDCardProps>(({ data, side }, ref) => {
  const { theme } = data;

  const qrData = JSON.stringify({
    id: data.studentId,
    name: data.studentName,
    prog: data.program,
    blood: data.bloodGroup,
    exp: data.expiryDate
  });

  const FrontSide = () => (
    <div className="w-full h-full flex flex-col">
      <div className="absolute top-0 left-0 w-full h-2" style={{ background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}></div>
      
      <div className="px-6 pt-6 pb-2 flex justify-between items-start relative z-10">
        <div className="w-16 h-16 flex-shrink-0">
          {data.logoUrl ? (
            <img src={data.logoUrl} alt="Logo" className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full rounded-full border-2 border-dashed flex items-center justify-center text-[10px] font-bold" style={{ borderColor: theme.secondaryColor, color: theme.primaryColor }}>LOGO</div>
          )}
        </div>

        <div className="flex-grow text-center px-2">
          <h1 className="text-2xl font-serif font-bold leading-tight uppercase tracking-tight" style={{ color: theme.primaryColor }}>
            {data.collegeName || "YOUR COLLEGE NAME"}
          </h1>
          <p className="text-[9px] font-medium opacity-70 mt-0.5" style={{ color: theme.labelColor }}>
            {data.affiliation || "Affiliated to University Name"}
          </p>
          <p className="text-[10px] font-semibold mt-1" style={{ color: theme.labelColor }}>
            {data.collegeAddress || "City, State, Country"}
          </p>
        </div>

        <div className="w-16 h-16 flex-shrink-0 pt-1">
          <QRCodeSVG 
            value={qrData} 
            size={60} 
            level="H" 
            fgColor={theme.valueColor}
            imageSettings={data.logoUrl ? { src: data.logoUrl, height: 14, width: 14, excavate: true } : undefined}
          />
        </div>
      </div>

      <div className="flex justify-center my-1 z-10">
        <div className="px-10 py-1 rounded-full shadow-sm text-white" style={{ background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}>
          <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">Identity Card</h3>
        </div>
      </div>

      <div className="flex-grow px-8 pb-4 flex relative z-10">
        <div className="flex-grow pt-4 pr-4">
          <div className="grid grid-cols-[70px_10px_1fr] gap-y-1.5 text-[13px] leading-tight">
            <LabelRow label="ID NO" value={data.studentId || "---"} theme={theme} isBold />
            <LabelRow label="NAME" value={data.studentName || "STUDENT NAME"} theme={theme} isBold />
            <LabelRow label="COURSE" value={data.program || "---"} theme={theme} />
            <LabelRow label="BLOOD" value={data.bloodGroup || "---"} theme={theme} />
            <LabelRow label="VALID UPTO" value={data.expiryDate || "---"} theme={theme} />
          </div>
        </div>

        <div className="w-28 flex flex-col items-center justify-end">
          <div className="w-24 h-28 bg-gray-50 border border-gray-200 overflow-hidden shadow-sm rounded-md mb-3 flex items-center justify-center">
            {data.photoUrl ? (
              <img src={data.photoUrl} alt="Student" className="w-full h-full object-cover" />
            ) : (
              <span className="text-[10px] text-gray-400">PHOTO</span>
            )}
          </div>
          <div className="w-20 border-b border-gray-400 h-6 mb-0.5">
            {data.principalSignatureUrl && <img src={data.principalSignatureUrl} className="h-full mx-auto object-contain" />}
          </div>
          <p className="text-[10px] font-bold" style={{ color: theme.labelColor }}>Principal Signature</p>
        </div>
      </div>
      <div className="h-1.5 w-full absolute bottom-0 left-0" style={{ background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.secondaryColor})` }}></div>
    </div>
  );

  const BackSide = () => (
    <div className="w-full h-full flex flex-col p-8">
      <div className="flex-grow border-2 border-dashed rounded-lg p-6 flex flex-col" style={{ borderColor: hexToRgba(theme.primaryColor, 0.2) }}>
        <h4 className="text-sm font-bold border-b pb-2 mb-3 uppercase tracking-wider" style={{ color: theme.primaryColor, borderColor: hexToRgba(theme.primaryColor, 0.1) }}>
          Instructions & Information
        </h4>
        <div className="flex-grow">
          <p className="text-[11px] leading-relaxed whitespace-pre-line text-gray-600">
            {data.instructions}
          </p>
        </div>
        
        <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4" style={{ borderColor: hexToRgba(theme.primaryColor, 0.1) }}>
          <div>
            <p className="text-[10px] font-bold uppercase opacity-60" style={{ color: theme.labelColor }}>Emergency Contact</p>
            <p className="text-xs font-semibold" style={{ color: theme.valueColor }}>{data.emergencyContact || data.collegePhone || "Not Provided"}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase opacity-60" style={{ color: theme.labelColor }}>Serial Number</p>
            <p className="text-xs font-mono" style={{ color: theme.valueColor }}>{data.cardSerial}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center px-2">
        <p className="text-[10px] font-medium" style={{ color: theme.labelColor }}>{data.website || "www.college-website.com"}</p>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.primaryColor }}></div>
          <div className="w-3 h-3 rounded-full opacity-50" style={{ backgroundColor: theme.secondaryColor }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      ref={ref}
      className="w-[600px] h-[375px] bg-white relative shadow-2xl overflow-hidden print:shadow-none"
      style={{
        backgroundImage: `radial-gradient(circle at 0% 0%, ${hexToRgba(theme.primaryColor, 0.03)} 0%, transparent 50%), 
                          radial-gradient(circle at 100% 100%, ${hexToRgba(theme.secondaryColor, 0.03)} 0%, transparent 50%)`
      }}
    >
      {side === 'front' ? <FrontSide /> : <BackSide />}
    </div>
  );
});

const LabelRow = ({ label, value, isBold = false, theme }: { label: string, value: string, isBold?: boolean, theme: IDTheme }) => (
  <>
    <div className="text-[10px] font-bold uppercase self-center opacity-70" style={{ color: theme.labelColor }}>{label}</div>
    <div className="text-center opacity-40 font-bold">:</div>
    <div className={`tracking-wide uppercase truncate ${isBold ? 'font-bold' : 'font-medium'}`} style={{ color: theme.valueColor }}>{value}</div>
  </>
);
