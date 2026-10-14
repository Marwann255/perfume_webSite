import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

interface ScentQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
}

export const ScentQuizModal: React.FC<ScentQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const { products } = useProducts();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    mood: '',
    profile: '',
    intensity: ''
  });

  if (!isOpen) return null;

  const questions = [
    {
      title: 'What mood or atmosphere do you wish to embody?',
      subtitle: 'Fragrance is an invisible garment that defines your presence.',
      options: [
        { label: 'Nocturnal, mysterious, and magnetic warmth', value: 'nocturnal' },
        { label: 'Quiet luxury, architectural elegance, and contemplation', value: 'intellectual' },
        { label: 'Sun-drenched Mediterranean coast and sparkling joie de vivre', value: 'solar' },
        { label: 'Tempestuous ocean waves, crisp sea salt, and damp earth', value: 'mineral' },
        { label: 'Hypnotic dark romance and vintage velvet', value: 'romantic' }
      ]
    },
    {
      title: 'Which olfactory notes evoke the strongest emotion in you?',
      subtitle: 'Select the raw materials that captivate your senses.',
      options: [
        { label: 'Smoked Agarwood (Oud), Black Amber, and Tonka', value: 'oud' },
        { label: 'Australian Sandalwood, Cardamom, and Tuscan Orris', value: 'santal' },
        { label: 'Bitter Orange Blossom, Neroli, and Wild Honey', value: 'floral' },
        { label: 'Madagascar Bourbon Vanilla, Charred Oak, and Rum', value: 'vanilla' },
        { label: 'Haitian Vetiver, Pink Pepper, and Driftwood', value: 'vetiver' }
      ]
    },
    {
      title: 'How do you prefer your fragrance to announce itself?',
      subtitle: 'Sillage is the radiant trail you leave in a room.',
      options: [
        { label: 'Commanding and eternal (an undeniable magnetic presence)', value: 'eternal' },
        { label: 'Sophisticated and moderate (intimate to those who draw near)', value: 'moderate' },
        { label: 'Subtle and skin-close (a private whisper for loved ones)', value: 'subtle' }
      ]
    }
  ];

  const handleSelectOption = (value: string) => {
    if (step === 0) setAnswers({ ...answers, mood: value });
    if (step === 1) setAnswers({ ...answers, profile: value });
    if (step === 2) {
      setAnswers({ ...answers, intensity: value });
      setStep(3); // Result stage
      return;
    }
    setStep(step + 1);
  };

  // Determine recommendation based on answers
  const getRecommendation = () => {
    if (answers.profile === 'oud' || answers.mood === 'nocturnal') {
      return products.find((p) => p.slug.includes('oud-nocturne')) || products[0];
    }
    if (answers.profile === 'vanilla') {
      return products.find((p) => p.slug.includes('vanille-fumee')) || products[3];
    }
    if (answers.profile === 'floral' || answers.mood === 'solar') {
      return products.find((p) => p.slug.includes('fleur-doranger')) || products[2];
    }
    if (answers.profile === 'vetiver' || answers.mood === 'mineral') {
      return products.find((p) => p.slug.includes('vetiver-minerale')) || products[4];
    }
    return products.find((p) => p.slug.includes('santal-celeste')) || products[1];
  };

  const recommendedPerfume = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FFFFFF]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#DDD5C5] text-[#1A1816] shadow-2xl rounded-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E7E1D4] flex items-center justify-between bg-[#F8F5EE]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8C6920]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#8C6920]">
              The Scent Finder Atelier
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#666158] hover:text-[#8C6920] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Steps */}
        {step < 3 ? (
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#766F64]">
              <span>Question {step + 1} of 3</span>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-8 h-1 rounded-full ${
                      i <= step ? 'bg-[#D4AF37]' : 'bg-[#E7E1D4]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-serif text-[#1A1816]">
                {questions[step].title}
              </h3>
              <p className="text-xs text-[#666158]">
                {questions[step].subtitle}
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              {questions[step].options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelectOption(opt.value)}
                  className="w-full text-left p-4 bg-[#F8F5EE] border border-[#DDD5C5] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all text-xs font-mono flex items-center justify-between group"
                >
                  <span className="text-[#1A1816] group-hover:text-[#8C6920]">
                    {opt.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#766F64] group-hover:text-[#8C6920] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Stage */
          <div className="p-8 text-center space-y-6 animate-in zoom-in-95">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#8C6920]">
                Your Bespoke Scent Match (98% Resonance)
              </span>
              <h2 className="text-3xl font-serif text-[#1A1816]">
                {recommendedPerfume.name}
              </h2>
              <p className="text-xs font-mono text-[#666158]">
                {recommendedPerfume.subtitle} • {recommendedPerfume.olfactoryFamily}
              </p>
            </div>

            <div className="max-w-md mx-auto aspect-[16/9] overflow-hidden rounded-sm border border-[#E7E1D4]">
              <img
                src={recommendedPerfume.images.hero}
                alt={recommendedPerfume.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs text-[#666158] max-w-md mx-auto leading-relaxed">
              "{recommendedPerfume.tagline}"
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {recommendedPerfume.accords.map((a) => (
                <span
                  key={a}
                  className="text-[10px] font-mono px-2.5 py-1 bg-[#F8F5EE] border border-[#DDD5C5] text-[#8C6920]"
                >
                  {a}
                </span>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => {
                  onSelectProduct(recommendedPerfume.id);
                  onClose();
                }}
                className="px-6 py-3 bg-[#D4AF37] hover:bg-[#8C6920] text-[#1A1816] font-mono text-xs uppercase tracking-widest font-bold"
              >
                Explore Full Notes & Flacon
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(0);
                  setAnswers({ mood: '', profile: '', intensity: '' });
                }}
                className="px-4 py-3 border border-[#DDD5C5] text-[#666158] hover:text-[#1A1816] font-mono text-xs uppercase flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
