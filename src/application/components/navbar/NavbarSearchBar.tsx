import { Form, Input, Popover } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const dictionary: Record<string, any> = {
  u: {
    name: "Users",
    url: "/users",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.232 7.232 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10Z"
        />
      </svg>
    ),
  },
  p: {
    name: "Products",
    url: "/products",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="M8 18h6v2H8zm0 4h10v2H8z" />
        <path
          fill="currentColor"
          d="M26 4H6a2.002 2.002 0 0 0-2 2v20a2.002 2.002 0 0 0 2 2h20a2.002 2.002 0 0 0 2-2V6a2.002 2.002 0 0 0-2-2Zm-8 2v4h-4V6ZM6 26V6h6v6h8V6h6l.001 20Z"
        />
      </svg>
    ),
  },
};

function NavbarSearchBar() {
  const [focus, setFocus] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  const navigate = useNavigate();

  const tokens = searchText?.split(" ");
  const identifier = tokens[0].toLowerCase();
  const value = tokens[1];
  const searchType = dictionary[identifier];

  function handleSearch() {
    if (searchType && tokens.length >= 2) {
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
              searchType.icon
            ) : (
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
            )
          }
          className="p-2 rounded-md"
          placeholder="Search..."
        />
      </Popover>
    </Form>
  );
}

export default NavbarSearchBar;
