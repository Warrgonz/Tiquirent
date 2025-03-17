import { AccordionItemProps } from "../../interface";

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  description,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className={`accordion-button ${isOpen ? "" : "collapsed"}`}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          {title}
        </button>
      </h2>
      <div className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}>
        <div className="accordion-body">{description}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
