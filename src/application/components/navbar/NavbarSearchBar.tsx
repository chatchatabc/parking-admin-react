import { Form, Input, Popover } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { globalStateUpdate } from "../../redux/slices/globalState";
import { useDispatch } from "react-redux";
import ParkingIconAsset from "../../assets/ParkingIconAsset";
import InvoiceIconAsset from "../../assets/InvoiceIconAsset";
import UserIconAsset from "../../assets/UserIconAsset";
import MagnifyIconAsset from "../../assets/MagnifyIconAsset";
import VehicleIconAsset from "../../assets/VehicleIconAsset";

const dictionary = {
  u: {
    name: "Users",
    url: "/users",
    icon: <UserIconAsset />,
  },
  p: {
    name: "Parking Lots",
    url: "/parking-lots",
    icon: <ParkingIconAsset />,
  },
  i: {
    name: "Invoices",
    url: "/invoices",
    icon: <InvoiceIconAsset />,
  },
  v: {
    name: "Vehicles",
    url: "/vehicles",
    icon: <VehicleIconAsset />,
  },
};

type DictionaryKey = keyof typeof dictionary;

function NavbarSearchBar() {
  const [focus, setFocus] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tokens = searchText?.split(" ");
  const identifier = tokens[0].toLowerCase() as DictionaryKey;
  const value = tokens.slice(1).join(" ");
  const searchType = dictionary[identifier];

  function handleSearch() {
    if (searchType && tokens.length >= 2) {
      navigate(`${searchType.url}?keyword=${value}`);
    } else {
      navigate(`/search?keyword=${searchText}`);
    }

    dispatch(globalStateUpdate({ reset: Math.random() * 100000000000000000 }));
  }

  return (
    <Form onFinish={handleSearch} className={`relative w-64 ml-12`}>
      <Popover
        open={focus && searchText.length > 0}
        onOpenChange={(open) => setFocus(open)}
        className="w-full"
        arrow={false}
        content={
          <ul className="w-56">
            {searchType && tokens.length >= 2 && (
              <li>
                <Link
                  to={`${searchType.url}?keyword=${value}`}
                  className="block p-2 text-xs hover:bg-gray-100"
                >
                  Search "{value}" in {searchType.name}
                </Link>
              </li>
            )}
            <li>
              <Link
                to={`/search?keyword=${searchText}`}
                className="block p-2 text-xs hover:bg-gray-100"
              >
                Search "{searchText}"
              </Link>
            </li>
          </ul>
        }
      >
        <Input
          onChange={(e) => setSearchText(e.target.value)}
          prefix={
            searchType && tokens.length >= 2 ? (
              <div className="w-6 h-6">{searchType.icon}</div>
            ) : (
              <div className="w-6 h-6">
                <MagnifyIconAsset />
              </div>
            )
          }
          className="p-2 rounded-md bg-bg3 text-t1"
          classNames={{
            input: "bg-bg3 text-t1 placeholder:text-t2",
          }}
          placeholder="Search..."
        />
      </Popover>
    </Form>
  );
}

export default NavbarSearchBar;
