import React, { FC, useCallback, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// @ts-ignore
import { Image } from "cloudinary-react";
import { setSnackbar } from "@src/store/reducers/feedbackReducer";
import { SearchIcon, CloseIcon } from "@src/components/common/helpers/svgIcons";
import PropertyCard from "../properties/propertyCard";
import {
  SingleProperty,
  ISearchWidget,
  UserProps,
} from "@src/components/common/helpers/interfaces";

interface IProps {
  user?: UserProps;
  properties: SingleProperty;
}

export const StandAloneSearchWidget: FC<ISearchWidget> = ({
  properties = [],
  placeholder = "Find your new home",
}) => {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (e: any) => {
    const searchedWords = e.target.value;
    setWordEntered(searchedWords);
    const newFilter = properties.filter(
      (d: SingleProperty) =>
        d.Title.toLowerCase().includes(searchedWords.toLowerCase()) ||
        d.Description.toLowerCase().includes(searchedWords.toLowerCase())
    );

    if (searchedWords === "") {
      setFilteredProperties([]);
    } else {
      // @ts-ignore
      setFilteredProperties(newFilter);
    }
  };

  const handleClose = () => {
    setFilteredProperties([]);
    setWordEntered("");
  };

  return (
    <>
      {/* Search Input  */}
      <div className="relative z-50">
        <input
          className="w-full p-5 bg-white text-xl text-gray-500 placeholder-gray-500 outline-none rounded-xl shadow-lg"
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="absolute top-5 right-3 transition duration-200">
          {filteredProperties.length != 0 ? (
            <button className="hover:cursor-pointer" onClick={handleClose}>
              <CloseIcon dimensions="w-6 h-6" fill="#9333EA" />
            </button>
          ) : (
            <SearchIcon width="26" height="26" fill="#9333EA" />
          )}
        </div>
      </div>

      {/* Search Results  */}
      <div className="relative">
        {filteredProperties.length != 0 && (
          <div className="absolute mt-2 p-2 max-h-56 w-full bg-white shadow-lg rounded-xl overflow-hidden overflow-y-auto transition-all duration-200 z-[1000]">
            {filteredProperties.slice(0, 15).map((d: SingleProperty) => (
              <Link
                key={d.ID}
                href={
                  d.Title
                    ? `/${d?.Category?.Title.toLowerCase()}/property?title=${d?.Title.toLowerCase().replace(
                        / /g,
                        "-"
                      )}&id=${d.ID}`
                    : ""
                }
              >
                <div className="my-2 p-3 hover:bg-gray-300 hover:rounded-lg grid grid-cols-4 sm:grid-cols-5">
                  {/* <img
                    // @ts-ignore
                    src={d.Images[0]}
                    alt={d.Title}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full"
                  /> */}
                  <Image
                    cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                    publicId={d.Images[0]}
                    crop="scale"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full"
                  />
                  <div className="col-span-3 sm:col-span-4">
                    <p className="font-medium">{d.Title.substring(0, 28)}</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-purple-600 font-bold text-lg">
                        ₦{Number(d.Price).toLocaleString()}
                      </h3>
                      <div className="mr-2 px-4 py-1 bg-purple-600 rounded-xl text-white">
                        {d.Category.Title}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export const PageSearchWidget: FC<ISearchWidget> = ({
  properties = [],
  placeholder = "Find your new home",
}) => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [wordEntered, setWordEntered] = useState("");
  const user = useSelector((state: IProps) => state.user);
  const dispatch = useDispatch();

  const handleFilter = (e: any) => {
    const searchedWords = e.target.value;
    setWordEntered(searchedWords);
    const newFilter = properties.filter(
      (d: SingleProperty) =>
        d.Title.toLowerCase().includes(searchedWords.toLowerCase()) ||
        d.Description.toLowerCase().includes(searchedWords.toLowerCase())
    );

    if (searchedWords === "") {
      setFilteredProperties(properties);
    } else {
      // @ts-ignore
      setFilteredProperties(newFilter);
    }
  };

  const handleStatusUpdate = useCallback(
    (propertyID: number, propertyStatus: string) => {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_REST_API}/user/update-property-status?user_id=${user?.userId}&property_id=${propertyID}&property_status=${propertyStatus}&jwt=${user?.jwt}`
        )
        .then((res) => {
          if (res.data.error) {
            dispatch(
              setSnackbar({
                status: "error",
                message: res.data.error,
                open: true,
              })
            );
          } else {
            dispatch(
              setSnackbar({
                status: "success",
                message: ` Property status updated`,
                open: true,
              })
            );
          }
          setFilteredProperties(
            window.location.href.indexOf("/buy") > -1
              ? res.data.buyProperties
              : window.location.href.indexOf("/rent") > -1
              ? res.data.rentProperties
              : res.data.shortletPropertie
          );
        })
        .catch((err) => {
          console.error(err);
          dispatch(
            setSnackbar({
              status: "error",
              message:
                " There was an error updating the property item, please contact support",
              open: true,
            })
          );
        });
    },
    []
  );

  const handleClose = () => {
    setFilteredProperties(properties);
    setWordEntered("");
  };

  return (
    <>
      {/* Search Input  */}
      <div className="relative my-4">
        <input
          className="w-full px-5 py-3 max-w-xs bg-white text-xl text-gray-500 placeholder-gray-500 outline-none rounded-xl shadow-lg"
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="absolute top-3.5 left-[17.5rem] transition duration-200">
          {wordEntered !== "" ? (
            <button className="hover:cursor-pointer" onClick={handleClose}>
              <CloseIcon dimensions="w-6 h-6" fill="#9333EA" />
            </button>
          ) : (
            <SearchIcon width="26" height="26" fill="#9333EA" />
          )}
        </div>
      </div>

      {/* Search Results  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        {filteredProperties.length! >= 1 ? (
          filteredProperties.map((property: SingleProperty) => (
            <PropertyCard
              key={property.ID}
              property={property}
              handleStatusUpdate={handleStatusUpdate}
            />
          ))
        ) : (
          <h4 className="my-6 text-2xl">No properties found</h4>
        )}
      </div>
    </>
  );
};
