import React, { useMemo, useState } from "react";
import "./App.css";
import floorplanImg from "./floorplan.jpeg";
import LoginPage from "./LoginPage"; // <--- 1. IMPORTED LOGIN PAGE

// Desks + rooms positions in % of image
const RESOURCES = [
  // Top row desks right (adjust x/y as needed)
  { id: "desk-t-01", type: "desk", label: "Desk T01", x: 31.5, y: 12 },
  { id: "desk-t-02", type: "desk", label: "Desk T02", x: 31.5, y: 16.5 },
  { id: "desk-t-03", type: "desk", label: "Desk T03", x: 31.5, y: 21 },
  { id: "desk-t-04", type: "desk", label: "Desk T04", x: 37, y: 12 },
  { id: "desk-t-05", type: "desk", label: "Desk T05", x: 37, y: 16.5 },
  { id: "desk-t-06", type: "desk", label: "Desk T06", x: 37, y: 21 },
  { id: "desk-t-07", type: "desk", label: "Desk T07", x: 39, y: 12 },
  { id: "desk-t-08", type: "desk", label: "Desk T08", x: 39, y: 16.5 },
  { id: "desk-t-09", type: "desk", label: "Desk T09", x: 39, y: 21 },
  { id: "desk-t-10", type: "desk", label: "Desk T10", x: 44.5, y: 12 },
  { id: "desk-t-11", type: "desk", label: "Desk T11", x: 44.5, y: 16.5 },
  { id: "desk-t-12", type: "desk", label: "Desk T12", x: 44.5, y: 21 },
  { id: "desk-t-13", type: "desk", label: "Desk T13", x: 46.5, y: 12 },
  { id: "desk-t-14", type: "desk", label: "Desk T14", x: 46.5, y: 16.5 },
  { id: "desk-t-15", type: "desk", label: "Desk T15", x: 46.5, y: 21 },
  { id: "desk-t-16", type: "desk", label: "Desk T16", x: 52.5, y: 12 },
  { id: "desk-t-17", type: "desk", label: "Desk T17", x: 52.5, y: 16.5 },
  { id: "desk-t-18", type: "desk", label: "Desk T18", x: 52.5, y: 21 },
  { id: "desk-t-19", type: "desk", label: "Desk T19", x: 54.5, y: 12 },
  { id: "desk-t-20", type: "desk", label: "Desk T20", x: 54.5, y: 16.5 },
  { id: "desk-t-21", type: "desk", label: "Desk T21", x: 54.5, y: 21 },
  { id: "desk-t-22", type: "desk", label: "Desk T22", x: 60, y: 12 },
  { id: "desk-t-23", type: "desk", label: "Desk T23", x: 60, y: 16.5 },
  { id: "desk-t-24", type: "desk", label: "Desk T24", x: 60, y: 21 },
  { id: "desk-t-25", type: "desk", label: "Desk T25", x: 62.5, y: 12 },
  { id: "desk-t-26", type: "desk", label: "Desk T26", x: 62.5, y: 16.5 },
  { id: "desk-t-27", type: "desk", label: "Desk T27", x: 62.5, y: 21 },
  { id: "desk-t-28", type: "desk", label: "Desk T28", x: 68, y: 12 },
  { id: "desk-t-29", type: "desk", label: "Desk T29", x: 68, y: 16.5 },
  { id: "desk-t-30", type: "desk", label: "Desk T30", x: 68, y: 21 },
  { id: "desk-t-31", type: "desk", label: "Desk T31", x: 70, y: 12 },
  { id: "desk-t-32", type: "desk", label: "Desk T32", x: 70, y: 16.5 },
  { id: "desk-t-33", type: "desk", label: "Desk T33", x: 70, y: 21 },
  { id: "desk-t-34", type: "desk", label: "Desk T34", x: 76, y: 12 },
  { id: "desk-t-35", type: "desk", label: "Desk T35", x: 76, y: 16.5 },
  { id: "desk-t-36", type: "desk", label: "Desk T36", x: 76, y: 21 },
  { id: "desk-t-37", type: "desk", label: "Desk T37", x: 78, y: 12 },
  { id: "desk-t-38", type: "desk", label: "Desk T38", x: 78, y: 16.5 },
  { id: "desk-t-39", type: "desk", label: "Desk T39", x: 78, y: 21 },
  { id: "desk-t-40", type: "desk", label: "Desk T40", x: 84, y: 12 },
  { id: "desk-t-41", type: "desk", label: "Desk T41", x: 84, y: 16.5 },
  { id: "desk-t-42", type: "desk", label: "Desk T42", x: 84, y: 21 },
  { id: "desk-t-43", type: "desk", label: "Desk T43", x: 85.8, y: 12 },
  { id: "desk-t-44", type: "desk", label: "Desk T44", x: 85.8, y: 16.5 },
  { id: "desk-t-45", type: "desk", label: "Desk T45", x: 85.8, y: 21 },
  { id: "desk-t-46", type: "desk", label: "Desk T46", x: 92, y: 12 },
  { id: "desk-t-47", type: "desk", label: "Desk T47", x: 92, y: 16.5 },
  { id: "desk-t-48", type: "desk", label: "Desk T48", x: 92, y: 21 },
  //top row desks left
  { id: "desk-t-49", type: "desk", label: "Desk T49", x: 103, y: 12 },
  { id: "desk-t-50", type: "desk", label: "Desk T50", x: 103, y: 16.5 },
  { id: "desk-t-51", type: "desk", label: "Desk T51", x: 103, y: 21 },
  { id: "desk-t-52", type: "desk", label: "Desk T52", x: 108, y: 12 },
  { id: "desk-t-53", type: "desk", label: "Desk T53", x: 108, y: 16.5 },
  { id: "desk-t-54", type: "desk", label: "Desk T54", x: 108, y: 21 },
  { id: "desk-t-55", type: "desk", label: "Desk T55", x: 110.5, y: 12 },
  { id: "desk-t-56", type: "desk", label: "Desk T56", x: 110.5, y: 16.5 },
  { id: "desk-t-57", type: "desk", label: "Desk T57", x: 110.5, y: 21 },
  { id: "desk-t-58", type: "desk", label: "Desk T58", x: 116, y: 12 },
  { id: "desk-t-59", type: "desk", label: "Desk T59", x: 116, y: 16.5 },
  { id: "desk-t-60", type: "desk", label: "Desk T60", x: 116, y: 21 },
  { id: "desk-t-61", type: "desk", label: "Desk T61", x: 118, y: 12 },
  { id: "desk-t-62", type: "desk", label: "Desk T62", x: 118, y: 16.5 },
  { id: "desk-t-63", type: "desk", label: "Desk T63", x: 118, y: 21 },
  { id: "desk-t-64", type: "desk", label: "Desk T64", x: 123.5, y: 12 },
  { id: "desk-t-65", type: "desk", label: "Desk T65", x: 123.5, y: 16.5 },
  { id: "desk-t-66", type: "desk", label: "Desk T66", x: 123.5, y: 21 },
  { id: "desk-t-67", type: "desk", label: "Desk T67", x: 125.5, y: 12 },
  { id: "desk-t-68", type: "desk", label: "Desk T68", x: 125.5, y: 16.5 },
  { id: "desk-t-69", type: "desk", label: "Desk T69", x: 125.5, y: 21 },
  { id: "desk-t-70", type: "desk", label: "Desk T70", x: 131.5, y: 12 },
  { id: "desk-t-71", type: "desk", label: "Desk T71", x: 131.5, y: 16.5 },
  { id: "desk-t-72", type: "desk", label: "Desk T72", x: 131.5, y: 21 },
  { id: "desk-t-73", type: "desk", label: "Desk T73", x: 134, y: 12 },
  { id: "desk-t-74", type: "desk", label: "Desk T74", x: 134, y: 16.5 },
  { id: "desk-t-75", type: "desk", label: "Desk T75", x: 134, y: 21 },
  { id: "desk-t-76", type: "desk", label: "Desk T76", x: 139, y: 12 },
  { id: "desk-t-77", type: "desk", label: "Desk T77", x: 139, y: 16.5 },
  { id: "desk-t-78", type: "desk", label: "Desk T78", x: 139, y: 21 },
  { id: "desk-t-79", type: "desk", label: "Desk T79", x: 141.5, y: 12 },
  { id: "desk-t-80", type: "desk", label: "Desk T80", x: 141.5, y: 16.5 },
  { id: "desk-t-81", type: "desk", label: "Desk T81", x: 141.5, y: 21 },
  { id: "desk-t-82", type: "desk", label: "Desk T82", x: 147.5, y: 12 },
  { id: "desk-t-83", type: "desk", label: "Desk T83", x: 147.5, y: 16.5 },
  { id: "desk-t-84", type: "desk", label: "Desk T84", x: 147.5, y: 21 },
  { id: "desk-t-85", type: "desk", label: "Desk T85", x: 149.5, y: 12 },
  { id: "desk-t-86", type: "desk", label: "Desk T86", x: 149.5, y: 16.5 },
  { id: "desk-t-87", type: "desk", label: "Desk T87", x: 149.5, y: 21 },
  { id: "desk-t-88", type: "desk", label: "Desk T88", x: 155, y: 12 },
  { id: "desk-t-89", type: "desk", label: "Desk T89", x: 155, y: 16.5 },
  { id: "desk-t-90", type: "desk", label: "Desk T90", x: 155, y: 21 },
  { id: "desk-t-91", type: "desk", label: "Desk T91", x: 157, y: 12 },
  { id: "desk-t-92", type: "desk", label: "Desk T92", x: 157, y: 16.5 },
  { id: "desk-t-93", type: "desk", label: "Desk T93", x: 157, y: 21 },
  { id: "desk-t-94", type: "desk", label: "Desk T94", x: 163, y: 12 },
  { id: "desk-t-95", type: "desk", label: "Desk T95", x: 163, y: 16.5 },
  { id: "desk-t-96", type: "desk", label: "Desk T96", x: 163, y: 21 },
  { id: "desk-t-97", type: "desk", label: "Desk T97", x: 165, y: 12 },
  { id: "desk-t-98", type: "desk", label: "Desk T98", x: 165, y: 16.5 },
  { id: "desk-t-99", type: "desk", label: "Desk T99", x: 165, y: 21 },
  { id: "desk-t-100", type: "desk", label: "Desk T100", x: 170.5, y: 12 },
  { id: "desk-t-101", type: "desk", label: "Desk T101", x: 170.5, y: 16.5 },
  { id: "desk-t-102", type: "desk", label: "Desk T102", x: 170.5, y: 21 },
  { id: "desk-t-103", type: "desk", label: "Desk T103", x: 172.5, y: 12 },
  { id: "desk-t-104", type: "desk", label: "Desk T104", x: 172.5, y: 16.5 },
  { id: "desk-t-105", type: "desk", label: "Desk T105", x: 172.5, y: 21 },
  { id: "desk-t-106", type: "desk", label: "Desk T106", x: 178.5, y: 12 },
  { id: "desk-t-107", type: "desk", label: "Desk T107", x: 178.5, y: 16.5 },
  { id: "desk-t-108", type: "desk", label: "Desk T108", x: 178.5, y: 21 },

  // Bottom row desks right
  { id: "desk-b-01", type: "desk", label: "Desk B01", x: 31.5, y: 79.5 },
  { id: "desk-b-02", type: "desk", label: "Desk B02", x: 31.5, y: 84 },
  { id: "desk-b-03", type: "desk", label: "Desk B03", x: 31.5, y: 89 },
  { id: "desk-b-04", type: "desk", label: "Desk B04", x: 37, y: 79.5 },
  { id: "desk-b-05", type: "desk", label: "Desk B05", x: 37, y: 84 },
  { id: "desk-b-06", type: "desk", label: "Desk B06", x: 37, y: 89 },
  { id: "desk-b-07", type: "desk", label: "Desk B07", x: 39, y: 79.5 },
  { id: "desk-b-08", type: "desk", label: "Desk B08", x: 39, y: 84 },
  { id: "desk-b-09", type: "desk", label: "Desk B09", x: 39, y: 89 },
  { id: "desk-b-10", type: "desk", label: "Desk B10", x: 44.5, y: 79.5 },
  { id: "desk-b-11", type: "desk", label: "Desk B11", x: 44.5, y: 84 },
  { id: "desk-b-12", type: "desk", label: "Desk B12", x: 44.5, y: 89 },
  { id: "desk-b-13", type: "desk", label: "Desk B13", x: 46.5, y: 79.5 },
  { id: "desk-b-14", type: "desk", label: "Desk B14", x: 46.5, y: 84 },
  { id: "desk-b-15", type: "desk", label: "Desk B15", x: 46.5, y: 89 },
  { id: "desk-b-16", type: "desk", label: "Desk B16", x: 52.5, y: 79.5 },
  { id: "desk-b-17", type: "desk", label: "Desk B17", x: 52.5, y: 84 },
  { id: "desk-b-18", type: "desk", label: "Desk B18", x: 52.5, y: 89 },
  { id: "desk-b-19", type: "desk", label: "Desk B19", x: 54.5, y: 79.5 },
  { id: "desk-b-20", type: "desk", label: "Desk B20", x: 54.5, y: 84 },
  { id: "desk-b-21", type: "desk", label: "Desk B21", x: 54.5, y: 89 },
  { id: "desk-b-22", type: "desk", label: "Desk B22", x: 60, y: 79.5 },
  { id: "desk-b-23", type: "desk", label: "Desk B23", x: 60, y: 84 },
  { id: "desk-b-24", type: "desk", label: "Desk B24", x: 60, y: 89 },
  { id: "desk-b-25", type: "desk", label: "Desk B25", x: 62.5, y: 79.5 },
  { id: "desk-b-26", type: "desk", label: "Desk B26", x: 62.5, y: 84 },
  { id: "desk-b-27", type: "desk", label: "Desk B27", x: 62.5, y: 89 },
  { id: "desk-b-28", type: "desk", label: "Desk B28", x: 68, y: 79.5 },
  { id: "desk-b-29", type: "desk", label: "Desk B29", x: 68, y: 84 },
  { id: "desk-b-30", type: "desk", label: "Desk B30", x: 68, y: 89 },
  { id: "desk-b-31", type: "desk", label: "Desk B31", x: 70, y: 79.5 },
  { id: "desk-b-32", type: "desk", label: "Desk B32", x: 70, y: 84 },
  { id: "desk-b-33", type: "desk", label: "Desk B33", x: 70, y: 89 },
  { id: "desk-b-34", type: "desk", label: "Desk B34", x: 76, y: 79.5 },
  { id: "desk-b-35", type: "desk", label: "Desk B35", x: 76, y: 84 },
  { id: "desk-b-36", type: "desk", label: "Desk B36", x: 76, y: 89 },
  { id: "desk-b-37", type: "desk", label: "Desk B37", x: 78, y: 79.5 },
  { id: "desk-b-38", type: "desk", label: "Desk B38", x: 78, y: 84 },
  { id: "desk-b-39", type: "desk", label: "Desk B39", x: 78, y: 89 },
  { id: "desk-b-40", type: "desk", label: "Desk B40", x: 84, y: 79.5 },
  { id: "desk-b-41", type: "desk", label: "Desk B41", x: 84, y: 84 },
  { id: "desk-b-42", type: "desk", label: "Desk B42", x: 84, y: 89 },
  { id: "desk-b-43", type: "desk", label: "Desk B43", x: 85.8, y: 79.5 },
  { id: "desk-b-44", type: "desk", label: "Desk B44", x: 85.8, y: 84 },
  { id: "desk-b-45", type: "desk", label: "Desk B45", x: 85.8, y: 89 },
  { id: "desk-b-46", type: "desk", label: "Desk B46", x: 92, y: 79.5 },
  { id: "desk-b-47", type: "desk", label: "Desk B47", x: 92, y: 84 },
  { id: "desk-b-48", type: "desk", label: "Desk B48", x: 92, y: 89 },
  { id: "desk-b-49", type: "desk", label: "Desk B49", x: 103, y: 79.5 },
  { id: "desk-b-50", type: "desk", label: "Desk B50", x: 103, y: 84 },
  { id: "desk-b-51", type: "desk", label: "Desk B51", x: 103, y: 89 },
  { id: "desk-b-52", type: "desk", label: "Desk B52", x: 108, y: 79.5 },
  { id: "desk-b-53", type: "desk", label: "Desk B53", x: 108, y: 84 },
  { id: "desk-b-54", type: "desk", label: "Desk B54", x: 108, y: 89 },
  { id: "desk-b-55", type: "desk", label: "Desk B55", x: 110.5, y: 79.5 },
  { id: "desk-b-56", type: "desk", label: "Desk B56", x: 110.5, y: 84 },
  { id: "desk-b-57", type: "desk", label: "Desk B57", x: 110.5, y: 89 },
  { id: "desk-b-58", type: "desk", label: "Desk B58", x: 116, y: 79.5 },
  { id: "desk-b-59", type: "desk", label: "Desk B59", x: 116, y: 84 },
  { id: "desk-b-60", type: "desk", label: "Desk B60", x: 116, y: 89 },
  { id: "desk-b-61", type: "desk", label: "Desk B61", x: 118, y: 79.5 },
  { id: "desk-b-62", type: "desk", label: "Desk B62", x: 118, y: 84 },
  { id: "desk-b-63", type: "desk", label: "Desk B63", x: 118, y: 89 },
  { id: "desk-b-64", type: "desk", label: "Desk B64", x: 123.5, y: 79.5 },
  { id: "desk-b-65", type: "desk", label: "Desk B65", x: 123.5, y: 84 },
  { id: "desk-b-66", type: "desk", label: "Desk B66", x: 123.5, y: 89 },
  { id: "desk-b-67", type: "desk", label: "Desk B67", x: 125.5, y: 79.5 },
  { id: "desk-b-68", type: "desk", label: "Desk B68", x: 125.5, y: 84 },
  { id: "desk-b-69", type: "desk", label: "Desk B69", x: 125.5, y: 89 },
  { id: "desk-b-70", type: "desk", label: "Desk B70", x: 131.5, y: 79.5 },
  { id: "desk-b-71", type: "desk", label: "Desk B71", x: 131.5, y: 84 },
  { id: "desk-b-72", type: "desk", label: "Desk B72", x: 131.5, y: 89 },
  { id: "desk-b-73", type: "desk", label: "Desk B73", x: 134, y: 79.5 },
  { id: "desk-b-74", type: "desk", label: "Desk B74", x: 134, y: 84 },
  { id: "desk-b-75", type: "desk", label: "Desk B75", x: 134, y: 89 },
  { id: "desk-b-76", type: "desk", label: "Desk B76", x: 139, y: 79.5 },
  { id: "desk-b-77", type: "desk", label: "Desk B77", x: 139, y: 84 },
  { id: "desk-b-78", type: "desk", label: "Desk B78", x: 139, y: 89 },
  { id: "desk-b-79", type: "desk", label: "Desk B79", x: 141.5, y: 79.5 },
  { id: "desk-b-80", type: "desk", label: "Desk B80", x: 141.5, y: 84 },
  { id: "desk-b-81", type: "desk", label: "Desk B81", x: 141.5, y: 89 },
  { id: "desk-b-82", type: "desk", label: "Desk B82", x: 147.5, y: 79.5 },
  { id: "desk-b-83", type: "desk", label: "Desk B83", x: 147.5, y: 84 },
  { id: "desk-b-84", type: "desk", label: "Desk B84", x: 147.5, y: 89 },
  { id: "desk-b-85", type: "desk", label: "Desk B85", x: 149.5, y: 79.5 },
  { id: "desk-b-86", type: "desk", label: "Desk B86", x: 149.5, y: 84 },
  { id: "desk-b-87", type: "desk", label: "Desk B87", x: 149.5, y: 89 },
  { id: "desk-b-88", type: "desk", label: "Desk B88", x: 155, y: 79.5 },
  { id: "desk-b-89", type: "desk", label: "Desk B89", x: 155, y: 84 },
  { id: "desk-b-90", type: "desk", label: "Desk B90", x: 155, y: 89 },
  { id: "desk-b-91", type: "desk", label: "Desk B91", x: 157, y: 79.5 },
  { id: "desk-b-92", type: "desk", label: "Desk B92", x: 157, y: 84 },
  { id: "desk-b-93", type: "desk", label: "Desk B93", x: 157, y: 89 },
  { id: "desk-b-94", type: "desk", label: "Desk B94", x: 163, y: 79.5 },
  { id: "desk-b-95", type: "desk", label: "Desk B95", x: 163, y: 84 },
  { id: "desk-b-96", type: "desk", label: "Desk B96", x: 163, y: 89 },
  { id: "desk-b-97", type: "desk", label: "Desk B97", x: 165, y: 79.5 },
  { id: "desk-b-98", type: "desk", label: "Desk B98", x: 165, y: 84 },
  { id: "desk-b-99", type: "desk", label: "Desk B99", x: 165, y: 89 },
  { id: "desk-b-100", type: "desk", label: "Desk B100", x: 170.5, y: 79.5 },
  { id: "desk-b-101", type: "desk", label: "Desk B101", x: 170.5, y: 84 },
  { id: "desk-b-102", type: "desk", label: "Desk B102", x: 170.5, y: 89 },
  { id: "desk-b-103", type: "desk", label: "Desk B103", x: 172.5, y: 79.5 },
  { id: "desk-b-104", type: "desk", label: "Desk B104", x: 172.5, y: 84 },
  { id: "desk-b-105", type: "desk", label: "Desk B105", x: 172.5, y: 89 },
  { id: "desk-b-106", type: "desk", label: "Desk B106", x: 178.5, y: 79.5 },
  { id: "desk-b-107", type: "desk", label: "Desk B107", x: 178.5, y: 84 },
  { id: "desk-b-108", type: "desk", label: "Desk B108", x: 178.5, y: 89 },
  //big boss rooms
  { id: "Admin-1", type: "admin", label: "Big Boss Office", x: 185, y: 17 },
  { id: "Admin-2", type: "admin", label: "Big Boss Office", x: 185, y: 77.5 },
  { id: "Admin-3", type: "admin", label: "Big Boss Office", x: 185, y: 94 },
  // Meeting rooms on the right
  { id: "Meeting-1", type: "room", label: "Meeting Room 1", x: 19, y: 11 },
  { id: "Meeting-2", type: "room", label: "Meeting Room 2", x: 19, y: 23 },
  { id: "Meeting-3", type: "room", label: "Meeting Room 3", x: 19, y: 84.5 },
  { id: "Meeting-4", type: "room", label: "Meeting Room 4", x: 19, y: 90 },
  { id: "Meeting-5", type: "room", label: "Meeting Room 5", x: 162, y: 59 },
  { id: "Meeting-6", type: "room", label: "Meeting Room 6", x: 185, y: 32 },
  //bubbles
  { id: "Bub-1", type: "bub", label: "Bubble Room 1", x: 27.5, y: 14 },
  { id: "Bub-2", type: "bub", label: "Bubble Room 2", x: 97.5, y: 22.5 },
  { id: "Bub-3", type: "bub", label: "Bubble Room 3", x: 27.5, y: 85.5 },
  { id: "Bub-4", type: "bub", label: "Bubble Room 4", x: 97.5, y: 92 },
  //wellness rooms
  { id: "Well-1", type: "wellness", label: "Wellness Room 1", x: 162, y: 40 },
  { id: "Well-2", type: "wellness", label: "Wellness Room 2", x: 32, y: 50 },
  //bigroom
  { id: "BigRoom-1", type: "bigroom", label: "Big Room 1", x: 171.5, y: 45 },
  { id: "BigRoom-2", type: "bigroom", label: "Big Room 2", x: 182.5, y: 45 },
  //beerpong
  { id: "Beerpong-1", type: "beerpong", label: "Beer Zone", x: 16.5, y: 48 },
];

// --- STATIC DEPARTMENT BOOKINGS (3 employees per department) ---
const DEPARTMENT_BOOKINGS = {
  Finance: [
    { employee: "Ana F.", deskId: "desk-t-01", start: "09:00", end: "11:00" },
    { employee: "Mihai F.", deskId: "desk-t-22", start: "11:00", end: "13:00" },
    { employee: "Ioana F.", deskId: "desk-t-12", start: "14:00", end: "17:00" },
  ],
  Commercial: [
    { employee: "Andrei C.", deskId: "desk-t-04", start: "09:00", end: "12:00" },
    { employee: "Bianca C.", deskId: "desk-t-27", start: "12:00", end: "15:00" },
    { employee: "Radu C.", deskId: "desk-t-46", start: "15:00", end: "18:00" },
  ],
  HR: [
    { employee: "Alexandra H.", deskId: "desk-b-12", start: "08:30", end: "11:30" },
    { employee: "George H.", deskId: "desk-b-58", start: "11:30", end: "14:30" },
    { employee: "Laura H.", deskId: "desk-b-26", start: "14:30", end: "17:30" },
  ],
  IT: [
    { employee: "Vlad I.", deskId: "desk-t-10", start: "09:00", end: "13:00" },
    { employee: "Daria I.", deskId: "desk-t-11", start: "10:00", end: "16:00" },
    { employee: "Tudor I.", deskId: "desk-t-12", start: "13:00", end: "18:00" },
  ],
  "Marketing&Strategy": [
    { employee: "Maria M.", deskId: "desk-t-13", start: "09:30", end: "12:30" },
    { employee: "Oana M.", deskId: "desk-t-14", start: "12:30", end: "15:30" },
    { employee: "Paul M.", deskId: "desk-t-15", start: "15:30", end: "18:00" },
  ],
  "Sales and Commercial": [
    { employee: "Iris S.", deskId: "desk-t-16", start: "08:00", end: "11:00" },
    { employee: "Cristi S.", deskId: "desk-t-17", start: "11:00", end: "14:00" },
    { employee: "Teodora S.", deskId: "desk-t-18", start: "14:00", end: "17:00" },
  ],
};

const DEPARTMENTS = Object.keys(DEPARTMENT_BOOKINGS);

// key is resource+date
function makeBookingKey(resourceId, dateStr) {
  return `${resourceId}_${dateStr}`;
}

// time helpers
function parseTimeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function intervalsOverlap(s1, e1, s2, e2) {
  return s1 < e2 && s2 < e1;
}

// department bookings as "virtual" bookings for a given resource
function getDeptBookingsForResource(resourceId) {
  const result = [];
  for (const [dept, items] of Object.entries(DEPARTMENT_BOOKINGS)) {
    for (const b of items) {
      if (b.deskId === resourceId) {
        result.push({
          resourceId,
          start: b.start,
          end: b.end,
          user: b.employee,
          department: dept,
          isDept: true,
        });
      }
    }
  }
  return result;
}

function App() {
  // --- 2. ADDED USER STATE (CRITICAL FIX) ---
  const [currentUser, setCurrentUser] = useState(null); 
  // ----------------------------------------

  const [selectedResourceId, setSelectedResourceId] = useState(
    RESOURCES[0]?.id || null
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10) // YYYY-MM-DD
  );
  const [startTime, setStartTime] = useState("18:00");
  const [endTime, setEndTime] = useState("20:00");
  const [zoom, setZoom] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [bookings, setBookings] = useState({});
  const [userActionCount, setUserActionCount] = useState(0);

  const selectedResource = useMemo(
    () => RESOURCES.find((r) => r.id === selectedResourceId),
    [selectedResourceId]
  );

  const isRequestType =
  selectedResource &&
  ["room", "wellness", "admin", "bub"].includes(selectedResource.type);

const primaryButtonLabel = isRequestType ? "Request" : "Book interval";

  const bookingKeyForSelected = useMemo(() => {
    if (!selectedResource) return null;
    return makeBookingKey(selectedResource.id, selectedDate);
  }, [selectedResource, selectedDate]);

  const userBookingsForSelected = useMemo(() => {
    if (!bookingKeyForSelected) return [];
    return bookings[bookingKeyForSelected] || [];
  }, [bookings, bookingKeyForSelected]);

  const deptBookingsForSelected = useMemo(() => {
    if (!selectedResource) return [];
    return getDeptBookingsForResource(selectedResource.id);
  }, [selectedResource]);

  const bookingsForSelected = useMemo(
    () => [...userBookingsForSelected, ...deptBookingsForSelected],
    [userBookingsForSelected, deptBookingsForSelected]
  );

  const hasValidInterval =
    startTime &&
    endTime &&
    parseTimeToMinutes(endTime) > parseTimeToMinutes(startTime);

  // is there something booked overlapping the selected interval (user + employees)
  const isSelectedBooked = useMemo(() => {
    if (!hasValidInterval) {
      // invalid interval -> we don't care about overlap yet
      return bookingsForSelected.length > 0;
    }

    const s = parseTimeToMinutes(startTime);
    const e = parseTimeToMinutes(endTime);

    return bookingsForSelected.some((b) =>
      intervalsOverlap(
        s,
        e,
        parseTimeToMinutes(b.start),
        parseTimeToMinutes(b.end)
      )
    );
  }, [bookingsForSelected, hasValidInterval, startTime, endTime]);

  const canBook =
    !!selectedResource && !!selectedDate && hasValidInterval && !isSelectedBooked;

  // --- 3. ADDED LOGIN HANDLER (CRITICAL FIX) ---
  const handleLogin = (username) => {
    setCurrentUser(username);
  };
  // ------------------------------------------

  const handleBook = () => {
    if (!selectedResource || !selectedDate) return;
    if (!startTime || !endTime) {
      alert("Please choose start and end time.");
      return;
    }

    const startMinutes = parseTimeToMinutes(startTime);
    const endMinutes = parseTimeToMinutes(endTime);

    if (endMinutes <= startMinutes) {
      alert("End time must be after start time.");
      return;
    }

    const key = makeBookingKey(selectedResource.id, selectedDate);
    const existingUserBookings = bookings[key] || [];
    const deptBookingsForRes = getDeptBookingsForResource(selectedResource.id);

    const allExisting = [...existingUserBookings, ...deptBookingsForRes];

    const hasOverlap = allExisting.some((b) =>
      intervalsOverlap(
        startMinutes,
        endMinutes,
        parseTimeToMinutes(b.start),
        parseTimeToMinutes(b.end)
      )
    );

    if (hasOverlap) {
      alert("This resource is already booked in that time interval.");
      return;
    }

    const userName = currentUser; // <--- 4. USING CURRENTUSER

    setBookings((prev) => ({
      ...prev,
      [key]: [
        ...(prev[key] || []),
        {
          resourceId: selectedResource.id,
          date: selectedDate,
          start: startTime,
          end: endTime,
          user: userName,
        },
      ],
    }));
    setUserActionCount(prevCount => prevCount + 1);
  };

  const handleCancel = () => {
    if (!selectedResource || !selectedDate) return;
    const key = makeBookingKey(selectedResource.id, selectedDate);
    const existing = bookings[key] || [];

    const userName = currentUser; // <--- 4. USING CURRENTUSER
    const filtered = existing.filter(
      (b) => !(b.start === startTime && b.end === endTime && b.user === userName)
    );

    if (filtered.length === existing.length) {
      alert("No booking with this exact interval to cancel.");
      return;
    }

    setBookings((prev) => {
      const copy = { ...prev };
      if (filtered.length > 0) {
        copy[key] = filtered;
      } else {
        delete copy[key];
      }
      return copy;
    });
  };

  const handleZoomChange = (delta) => {
    setZoom((z) => {
      const next = Math.min(2.5, Math.max(0.7, z + delta));
      return Number(next.toFixed(2));
    });
  };


  // department view data for highlighting and list
  const departmentBookings = useMemo(() => {
    if (!selectedDepartment) return [];
    return DEPARTMENT_BOOKINGS[selectedDepartment] || [];
  }, [selectedDepartment]);

  const departmentDeskIds = useMemo(
    () => departmentBookings.map((b) => b.deskId),
    [departmentBookings]
  );

  // --- 5. CONDITIONAL RENDER (CRITICAL FIX) ---
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }
  // ------------------------------------------

  return (
    <div className="app">
      <div className="map-wrapper">
        <h1 className="map-title">Office Planner</h1>

        {/* --- 6. ADDED USER INFO / LOGOUT BAR --- */}
        <div className="user-info">
          <span>
            Logged in as: <strong>{currentUser}</strong>
          </span>
          <span>
            Bookings : <strong>{userActionCount} 🍻 </strong>
          </span>
          <span className="booking-status-text">
          {/* Example: Display a status based on the count */}
          {userActionCount == 20 ? 'One beer on the house!' : 'Reach 20 bookings for one free beer!'}
        </span>
          <button
            onClick={() => setCurrentUser(null)}
            className="secondary-btn"
          >
            Logout
          </button>
        </div>
        {/* -------------------------------------- */}

        <div className="layout">
          {/* LEFT – MAP */}
          <div className="map-card">
            <div className="map-toolbar">
              <span className="toolbar-label">Zoom</span>
              <button onClick={() => handleZoomChange(-0.1)}>-</button>
              <span className="zoom-label">{Math.round(zoom * 100)}%</span>
              <button onClick={() => handleZoomChange(0.1)}>+</button>
            </div>

            <div className="map-viewport">
              <div
                className={
                  "map-inner" +
                  (selectedDepartment ? " map-inner--dept-filter" : "")
                }
                style={{ transform: `scale(${zoom})` }}
              >
                <img
                  src={floorplanImg}
                  alt="Office floorplan"
                  className="map-image"
                />

                {RESOURCES.map((res) => {
  const key = makeBookingKey(res.id, selectedDate);
  const userIntervals = bookings[key] || [];
  const deptIntervalsForRes = getDeptBookingsForResource(res.id);
  const intervals = [...userIntervals, ...deptIntervalsForRes];

  const isSelected = res.id === selectedResourceId;
  let isBookedForInterval = false;

  if (hasValidInterval) {
    const s = parseTimeToMinutes(startTime);
    const e = parseTimeToMinutes(endTime);
    isBookedForInterval = intervals.some((b) =>
      intervalsOverlap(
        s,
        e,
        parseTimeToMinutes(b.start),
        parseTimeToMinutes(b.end)
      )
    );
  }

  const isBooked = hasValidInterval
    ? isBookedForInterval
    : intervals.length > 0;

  const isDeptHighlighted =
    selectedDepartment && departmentDeskIds.includes(res.id);
  const isReqTypeRes = ["room", "wellness", "admin", "bub"].includes(
    res.type
  );

  return (
    <button
      key={res.id}
      className={[
        "resource-pin",
        `resource-${res.type}`,
        isBooked ? "resource-booked" : "resource-free",
        isBooked && isReqTypeRes ? "resource-booked-request" : "",
        isSelected ? "resource-selected" : "",
        isDeptHighlighted ? "resource-dept-highlight" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        left: `${res.x}%`,
        top: `${res.y}%`,
      }}
      onClick={() => setSelectedResourceId(res.id)}
      title={`${res.label} • ${
        hasValidInterval
          ? isBooked
            ? "Not available in this interval"
            : "Available in this interval"
          : isBooked
          ? "Has bookings this day"
          : "No bookings this day"
      }`}
    >
      <span className="resource-pin-label">
        {res.type === "desk"
          ? "D"
          : res.type === "room"
          ? "R"
          : res.type === "admin"
          ? "A"
          : res.type === "bub"
          ? "B"
          : res.type === "wellness"
          ? "W"
          : res.type === "bigroom"
          ? "B"
          : res.type === "beerpong"
          ? "BZ"
          : "."}
      </span>
    </button>
  );
})}

              </div>
            </div>
          </div>

          {/* RIGHT – BOOKING PANEL */}
          <aside className="booking-card">
            <h2>Booking</h2>

            {selectedResource ? (
              <>
                <div className="booking-section">
                  <p className="booking-label">Selected</p>
                  <p className="booking-value">
                    <strong>{selectedResource.label}</strong>{" "}
                    <span className="badge">
                      {selectedResource.type === "desk"
                        ? "Desk"
                        : selectedResource.type === "room"
                        ? "Meeting Room"
                        : selectedResource.type}
                    </span>
                  </p>
                </div>

                <div className="booking-section">
                  <label className="booking-label" htmlFor="date">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                {/* Time interval inputs */}
                <div className="booking-section booking-times">
                  <div className="booking-times-header">
                    <span className="booking-label">Time interval</span>
                  </div>

                  <div className="time-row">
                    <div className="time-field">
                      <label htmlFor="startTime">Start</label>
                      <input
                        id="startTime"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </div>

                    <span className="time-separator">to</span>

                    <div className="time-field">
                      <label htmlFor="endTime">End</label>
                      <input
                        id="endTime"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Department view (after time interval) */}
                <div className="booking-section">
                  <label className="booking-label" htmlFor="department">
                    Department view
                  </label>
                  <select
                    id="department"
                    className="booking-select"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="">All departments</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>

                  {selectedDepartment && (
                    <>
                      <p className="booking-subtitle">
                        Showing bookings for {selectedDepartment}
                      </p>
                      <ul className="dept-booking-list">
                        {departmentBookings.map((b, idx) => {
                          const desk = RESOURCES.find(
                            (r) => r.id === b.deskId
                          );
                          return (
                            <li key={idx}>
                              <span className="dept-employee">{b.employee}</span>
                              <span className="dept-desk">
                                {desk ? desk.label : b.deskId}
                              </span>
                              <span className="dept-time">
                                {b.start} – {b.end}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                  </>
                  )}
                </div>

                <div className="booking-section">
                  <p className="booking-label">Status</p>
                  <p
                    className={
                      "booking-status " +
                      (isSelectedBooked ? "status-booked" : "status-free")
                    }
                  >
                    {hasValidInterval
                      ? isSelectedBooked
                        ? "Booked in this time interval"
                        : "Available in this time interval"
                      : isSelectedBooked
                      ? "Has bookings for this date"
                      : "No bookings for this date"}
                  </p>

                  {bookingsForSelected.length > 0 && (
                      <ul className="booking-list">
                        {bookingsForSelected.map((b, idx) => {
                          // --- 4. USING CURRENTUSER FOR CHECK ---
                          const isRequestForYou = isRequestType && b.user === currentUser;

                          return (
                            <li key={idx}>
                              {b.start}-{b.end} {isRequestForYou ? "Request " : ""}
                              ({b.user}
                              {b.department ? `, ${b.department}` : ""})
                            </li>
                          );
                        })}
                      </ul>
                  )}

                </div>

                <div className="booking-actions">
                    <button
                      className={[
                        "primary-btn",
                        isRequestType ? "primary-btn--request" : "",
                        !canBook ? "primary-btn--blocked" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={handleBook}
                      disabled={!canBook}
                    >
                      {primaryButtonLabel}
                    </button>
                    <button className="secondary-btn" onClick={handleCancel}>
                      Cancel this interval
                    </button>
                  </div>


                <p className="hint">
                  Pick a date and time interval (e.g. 18:00–20:00). Pins turn
                  green if they’re free for that interval and red if they’re
                  booked by you or department employees. Selecting a department
                  highlights that team’s desks.
                </p>
              </>
            ) : (
              <p>Select a desk or room on the map.</p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;