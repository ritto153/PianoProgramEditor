// import React, { createContext, useContext, useState } from "react";
import response from "./data/response.json";
import { PartMapBuilder } from "./utils/PartMapBuilder";

export const PartMap = PartMapBuilder(response);