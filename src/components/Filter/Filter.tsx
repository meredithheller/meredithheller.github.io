import { Dropdown } from 'react-bootstrap';
import type { TimelineCategory } from '../../types/timeline';
import './Filter.css';

interface FilterProps {
  selectedCategory: TimelineCategory | null;
  onCategoryChange: (category: TimelineCategory | null) => void;
}

const filterOptions: { category: TimelineCategory; label: string }[] = [
  { category: 'Building', label: 'I want to hire mere' },
  { category: 'Loving', label: 'I want to live like mere' },
  { category: 'Reading', label: 'I want to get educated like mere' },
  { category: 'Listening', label: 'I want to hear like mere' },
  { category: 'Doing', label: 'I want to make memories like mere' },
  { category: 'Creating', label: 'I want to create like mere' },
];

const Filter: React.FC<FilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const getCategoryColor = (category: TimelineCategory): string => {
    switch (category) {
      case 'Listening':
        return '#4F6784';
      case 'Loving':
        return '#F8DBEE';
      case 'Building':
        return '#2F3A4C';
      case 'Reading':
        return '#493E32';
      case 'Doing':
        return '#D5E4F0';
      case 'Creating':
        return '#E8C5A0';
      default:
        return '#4F6784';
    }
  };

  const getDisplayText = (): string => {
    if (selectedCategory === null) {
      return 'Show All';
    }
    const option = filterOptions.find(opt => opt.category === selectedCategory);
    return option ? option.label : 'Show All';
  };

  const handleSelect = (eventKey: string | null) => {
    if (eventKey === 'all') {
      onCategoryChange(null);
    } else {
      onCategoryChange(eventKey as TimelineCategory);
    }
  };

  return (
    <div className="filter-container">
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle 
          variant="outline-secondary" 
          id="filter-dropdown"
          className="filter-dropdown-toggle"
        >
          {getDisplayText()}
        </Dropdown.Toggle>

        <Dropdown.Menu className="filter-dropdown-menu">
          <Dropdown.Item 
            eventKey="all"
            active={selectedCategory === null}
            className={selectedCategory === null ? 'active' : ''}
            style={{
              borderLeft: `4px solid #4F6784`,
            }}
          >
            Show All
          </Dropdown.Item>
          {filterOptions.map((option) => (
            <Dropdown.Item
              key={option.category}
              eventKey={option.category}
              active={selectedCategory === option.category}
              className={selectedCategory === option.category ? 'active' : ''}
              style={{
                borderLeft: `4px solid ${getCategoryColor(option.category)}`,
              }}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Filter;

