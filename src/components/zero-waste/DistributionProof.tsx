"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { slideInRight } from "@/lib/animations";
import { ArrowLeft, Camera, Image as ImageIcon, Upload, CheckCircle2, ShieldCheck } from "lucide-react";

export function DistributionProof() {
  const { setScreen, addImpactPoints } = useAppStore();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraOpen(true);
      }
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      setIsCameraOpen(false);
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setPhotoUrl(dataUrl);
        stopCamera();
      }
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      addImpactPoints(50, "Distribution Proof Uploaded");
      setTimeout(() => {
        setScreen("receiverHome");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex h-full flex-col bg-[#F7F5F0]">
      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-white px-4 py-4 shadow-sm">
        <button
          onClick={() => {
            stopCamera();
            setScreen("receiverHome");
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F5F0]"
        >
          <ArrowLeft size={20} className="text-[#0A0A0A]" />
        </button>
        <h1 className="text-lg font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-outfit)" }}>
          Upload Distribution Proof
        </h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <motion.div variants={slideInRight} initial="initial" animate="animate" className="flex flex-col gap-6">
          
          <div className="bg-[#F0F7F2] rounded-[20px] p-4 flex gap-3 border border-[#BBF7D0]">
            <ShieldCheck className="text-[#1A6B3C] shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-[#1A6B3C] text-[15px]" style={{ fontFamily: "var(--font-outfit)" }}>Verify Distribution</h3>
              <p className="text-[#4A4A4A] text-sm mt-0.5" style={{ fontFamily: "var(--font-jakarta)" }}>
                Upload a photo of the food being distributed to earn impact points and maintain NGO trust rating.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl bg-[#E8E8E4] border-2 border-dashed border-[#C0C0C0] relative h-[300px] flex items-center justify-center">
            {photoUrl ? (
              <>
                <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setPhotoUrl(null)}
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold shadow-sm"
                >
                  Retake Photo
                </button>
              </>
            ) : (
              <div className="text-center w-full h-full">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover absolute inset-0 hidden" 
                  style={{ display: isCameraOpen ? 'block' : 'none' }}
                />
                {!isCameraOpen && (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-3">
                      <Camera size={30} className="text-[#8A8A8A]" />
                    </div>
                    <p className="text-[#4A4A4A] font-medium" style={{ fontFamily: "var(--font-jakarta)" }}>Capture distribution</p>
                    <button 
                      onClick={startCamera}
                      className="mt-4 bg-[#1E3A8A] text-white px-6 py-2.5 rounded-full text-[15px] font-bold shadow-sm"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      Open Camera
                    </button>
                  </div>
                )}
              </div>
            )}
            {isCameraOpen && !photoUrl && (
              <button 
                onClick={takePhoto}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full border-4 border-white bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-[0_0_0_2px_rgba(0,0,0,0.1)_inset]"
              >
                <div className="h-14 w-14 rounded-full bg-white shadow-md" />
              </button>
            )}
          </div>

          <div>
            <label className="text-[13px] font-semibold text-[#8A8A8A] block mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
              Add a note (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Successfully distributed 50 meals at..."
              rows={3}
              className="w-full bg-white border border-[#E8E8E4] rounded-xl px-4 py-3 text-[15px] text-[#0A0A0A] focus:outline-none focus:border-[#1E3A8A] resize-none"
            />
          </div>

        </motion.div>
      </div>

      <div className="p-6 bg-white border-t border-[#E8E8E4]">
        <button
          disabled={!photoUrl || loading || success}
          onClick={handleSubmit}
          className="h-[56px] w-full rounded-full text-[17px] font-bold text-white transition-all disabled:opacity-50 relative overflow-hidden"
          style={{ 
            background: "#1E3A8A",
            fontFamily: "var(--font-outfit)",
            boxShadow: "0 8px 24px rgba(30,58,138,0.25)"
          }}
        >
          {loading ? (
            <span className="animate-pulse">Uploading Proof...</span>
          ) : success ? (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 size={20} />
              <span>Verified!</span>
            </div>
          ) : (
            <span>Submit Verification</span>
          )}
          
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 40, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 z-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1E3A8A]"
              />
            )}
          </AnimatePresence>
        </button>
      </div>
      
      {/* Success Full Overlay */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center text-white bg-[#1E3A8A]"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.2 }}
              className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-md mb-6"
            >
              <CheckCircle2 size={48} className="text-white" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-center px-6"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Proof Verified!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-2 text-white/80 text-center px-8"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              You earned +50 Impact Points for successful distribution.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
