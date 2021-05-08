import React, { useEffect, useState } from "react";
import ClickedOutsideAnElementHandler from "../ClickedOutsideAnElementHandler/ClickedOutsideAnElementHandler";
import { BiChevronDown } from "react-icons/bi";
import lodash from "lodash";
import "./ListDropDown.scss";

type TSelectedItemsList = { [key: string]: string | number }[];

type Props = {
  label: string;
  labelPlaceholder?: string;
  dropdownFloatDirection?: "left" | "right";
  listItems: string[] | null;
  selectedListItems?: string[] | [];
  multipleSelect?: boolean;
  listItemContainerClass?: string;
  listItemClass?: string;
  listLabelClass?: string;
  labelIsActive?: boolean;
  onSelectItem: (selectedItems: TSelectedItemsList) => void;
};

const ListDropDown: React.FC<Props> = ({
  label,
  labelPlaceholder,
  dropdownFloatDirection,
  listItems,
  selectedListItems = [],
  multipleSelect = false,
  listItemContainerClass,
  listItemClass,
  listLabelClass,
  labelIsActive,
  onSelectItem,
}) => {
  const [showList, setShowList] = useState<boolean>(false);
  const [dropDownLabel, setDropDownLabel] = useState<string>(label);
  const [
    selectedItemsList,
    setSelectedItemsList,
  ] = useState<TSelectedItemsList>([]);

  useEffect(() => {
    setDropDownLabel(label);
    let currentSelectedItemsList: TSelectedItemsList = [];
    selectedListItems.forEach((item: string, index: number) => {
      currentSelectedItemsList.push({ item, index });
    });

    setSelectedItemsList(currentSelectedItemsList);
  }, [label, selectedListItems]);

  const handleOnClicked = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    let _showList = showList;
    setShowList(!_showList);
  };

  const handleSelectItem = (
    selectedItem: string,
    selectedItemIndex: number,
    currentSelectedItemsList: TSelectedItemsList
  ) => {
    setDropDownLabel(selectedItem);
    let newSelectedItems = lodash.cloneDeep(currentSelectedItemsList);
    newSelectedItems.push({ item: selectedItem, index: selectedItemIndex });

    if (!multipleSelect) {
      setShowList(false);
      onSelectItem(newSelectedItems);
    }
  };

  return (
    <ClickedOutsideAnElementHandler
      onClickedOutside={() => {
        setShowList(false);
      }}
    >
      <div className="list-dropdown-wrapper">
        <div
          className={`list-dropdown-label-wrapper`}
          style={
            dropDownLabel !== labelPlaceholder || labelIsActive
              ? { color: "#222222" }
              : {}
          }
          onClick={handleOnClicked}
        >
          <div className={`list-dropdown-label ${listLabelClass}`}>
            {dropDownLabel}
          </div>
          <BiChevronDown className={`list-dropdown-label ${listLabelClass}`} />
        </div>

        {showList && (
          <div
            className={`list-dropdown-component-wrapper ${listItemContainerClass}`}
            style={dropdownFloatDirection === "left" ? { right: "0" } : {}}
          >
            {listItems?.map((item, index) => (
              <div
                key={index}
                className={`list-dropdown-item ${listItemClass}`}
                onClick={(e) =>
                  handleSelectItem(item, index, selectedItemsList)
                }
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </ClickedOutsideAnElementHandler>
  );
};

export default ListDropDown;
