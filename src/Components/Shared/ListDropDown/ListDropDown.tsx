import React, { Fragment, useEffect, useState } from "react";
import ClickedOutsideAnElementHandler from "../ClickedOutsideAnElementHandler/ClickedOutsideAnElementHandler";
import { BiChevronDown } from "react-icons/bi";
import lodash from "lodash";
import CheckBox from "../CheckBox/CheckBox";
import "./ListDropDown.scss";
import { FiMoreVertical } from "react-icons/fi";

type Props = {
  label?: string;
  labelPlaceholder?: string;
  dropdownFloatDirection?: "left" | "right";
  listItems: string[] | null;
  selectedListItems?: string[] | [];
  multipleSelect?: boolean;
  listItemContainerClass?: string;
  listItemClass?: string;
  LabelWrapperClass?: string;
  listLabelClass?: string;
  labelIsActive?: boolean;
  menuIcon?: "horizontal" | "vertical";
  onSelectItem: (selectedItems: string[]) => void;
};

const ListDropDown: React.FC<Props> = ({
  label = "",
  labelPlaceholder,
  dropdownFloatDirection,
  listItems,
  selectedListItems = [],
  multipleSelect = false,
  listItemContainerClass,
  listItemClass,
  listLabelClass,
  LabelWrapperClass,
  labelIsActive,
  menuIcon,
  onSelectItem,
}) => {
  const [showList, setShowList] = useState<boolean>(false);
  const [dropDownLabel, setDropDownLabel] = useState<string>(label);

  useEffect(() => {
    setDropDownLabel(label);
  }, [label]);

  const handleOnClicked = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    let _showList = showList;
    setShowList(!_showList);
  };

  const handleSelectItem = (
    selectedItem: string,
    currentSelectedItemsList: string[]
  ) => {
    setDropDownLabel(selectedItem);
    let newSelectedItems = lodash.cloneDeep(currentSelectedItemsList);
    let itemExistsInCurrentSelectedItemsList = false;
    currentSelectedItemsList.forEach((item, index) => {
      if (!itemExistsInCurrentSelectedItemsList && item === selectedItem) {
        newSelectedItems.splice(index, 1);
        itemExistsInCurrentSelectedItemsList = true;
      }
    });

    if (!itemExistsInCurrentSelectedItemsList)
      newSelectedItems.push(selectedItem);

    if (!multipleSelect) setShowList(false);

    onSelectItem(newSelectedItems);
  };

  return (
    <div className="list-dropdown-wrapper">
      <div
        className={`list-dropdown-label-wrapper ${LabelWrapperClass}`}
        style={
          dropDownLabel !== labelPlaceholder || labelIsActive
            ? { color: "#222222" }
            : {}
        }
        onClick={handleOnClicked}
      >
        {!menuIcon && (
          <Fragment>
            <div className={`list-dropdown-label ${listLabelClass}`}>
              {labelPlaceholder ? labelPlaceholder : dropDownLabel}
            </div>
            <BiChevronDown
              className={`list-dropdown-label ${listLabelClass}`}
            />
          </Fragment>
        )}

        {menuIcon && (
          <FiMoreVertical className={`list-dropdown-label ${listLabelClass}`} />
        )}
      </div>

      {showList && (
        <ClickedOutsideAnElementHandler
          className={`list-dropdown-component-wrapper ${listItemContainerClass}`}
          style={dropdownFloatDirection === "left" ? { right: "0" } : {}}
          onClickedOutside={() => {
            setShowList(false);
          }}
        >
          <div>
            {listItems?.map((item, index) =>
              multipleSelect ? (
                <CheckBox
                  key={index}
                  checkBoxWrapperClass={`list-dropdown-item ${listItemClass}`}
                  label={item}
                  value={selectedListItems.includes(item)}
                  onClick={(l, s) => handleSelectItem(item, selectedListItems)}
                />
              ) : (
                <div
                  key={index}
                  className={`list-dropdown-item ${listItemClass}`}
                  onClick={(e) => handleSelectItem(item, selectedListItems)}
                >
                  {item}
                </div>
              )
            )}
          </div>
        </ClickedOutsideAnElementHandler>
      )}
    </div>
  );
};

export default ListDropDown;
