import React, { useEffect, useState } from "react";
import ClickedOutsideAnElementHandler from "../ClickedOutsideAnElementHandler/ClickedOutsideAnElementHandler";
import { BiChevronDown } from "react-icons/bi";
import lodash from "lodash";
import { TSelectedItemsList } from "../../../TypescriptUtils/types";
import "./ListDropDown.scss";

type Props = {
  label?: string;
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
  label = "",
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
  }, [label]);

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
          {labelPlaceholder ? labelPlaceholder : dropDownLabel}
        </div>
        <BiChevronDown className={`list-dropdown-label ${listLabelClass}`} />
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
                <div
                  key={index}
                  className={`list-dropdown-item ${listItemClass}`}
                  onClick={(e) =>
                    handleSelectItem(item, index, selectedItemsList)
                  }
                >
                  {item}
                </div>
              ) : (
                <div
                  key={index}
                  className={`list-dropdown-item ${listItemClass}`}
                  onClick={(e) =>
                    handleSelectItem(item, index, selectedItemsList)
                  }
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
