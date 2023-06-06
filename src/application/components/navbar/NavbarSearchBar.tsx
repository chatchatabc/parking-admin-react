import { Form, Input, Popover } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { globalStateUpdate } from "../../redux/slices/globalState";
import { useDispatch } from "react-redux";

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
    name: "Parking Lots",
    url: "/parking-lots",
    icon: (
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-width="4"
        >
          <path d="M24 44s16-12 16-25c0-8.284-7.163-15-16-15S8 10.716 8 19c0 13 16 25 16 25Z" />
          <path stroke-linecap="round" d="M21 14v16" />
          <path d="M21 14h6a4 4 0 0 1 0 8h-6v-8Z" />
        </g>
      </svg>
    ),
  },
};

function NavbarSearchBar() {
  const [focus, setFocus] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tokens = searchText?.split(" ");
  const identifier = tokens[0].toLowerCase();
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
