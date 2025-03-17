export interface PhoneProps {
  className?: string;
}

export interface ButtonProps {
  label: string;
  size?: "small" | "medium" | "large";
}

export interface ImgDescriptionProps {
  src: string;
  alt: string;
}

export interface AccordionItemProps {
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}
