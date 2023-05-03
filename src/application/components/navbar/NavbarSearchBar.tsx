import { Form, Input, Popover } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const dictionary: Record<string, any> = {
  u: {
    name: "Users",
    url: "/users",
  },
  p: {
    name: "Products",
    url: "/products",
  },
};

function NavbarSearchBar() {
  const [focus, setFocus] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  const navigate = useNavigate();

  const tokens = searchText?.split(":");
  const identifier = tokens[0].toLowerCase();
  const value = tokens[1];
  const searchType = dictionary[identifier];

  function handleSearch() {
    if (searchType) {
      navigate(`${searchType.url}?keyword=${value}`);
    } else {
      navigate(`/search?keyword=${searchText}`);
    }
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
            {searchType && (
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="m229.66 218.34l-50.07-50.06a88.11 88.11 0 1 0-11.31 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32ZM40 112a72 72 0 1 1 72 72a72.08 72.08 0 0 1-72-72Z"
              />
            </svg>
          }
          className="p-2 rounded-md"
          placeholder="Search..."
        />
      </Popover>
    </Form>
  );
}

export default NavbarSearchBar;
