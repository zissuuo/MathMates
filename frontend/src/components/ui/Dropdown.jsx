import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const DropdownContainer = styled.div`
  width: 200px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  width: 80%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  font-family: "Pretendard-Medium";
  font-size: 12px;
  color: #252a2f;
  margin-left: 10px; /* Label과의 간격을 조정 */
  box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-family: "Pretendard-ExtraBold";
  color: #252a2f;
  font-size: 12px;
  display: flex;
  align-items: center;
  flex-direction: row; /* Label과 Select를 가로로 배치 */
`;

const Dropdown = ({ options, onSelect, label }) => {
  const handleChange = (event) => {
    onSelect(event.target.value);
  };

  return (
    <DropdownContainer>
      <Label>
        {label}
        <Select onChange={handleChange}>
          <option value="">{label}을 선택해주세요</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </Label>
    </DropdownContainer>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  label: PropTypes.string,
};

Dropdown.defaultProps = {
  label: "Choose an option:",
};

export default Dropdown;