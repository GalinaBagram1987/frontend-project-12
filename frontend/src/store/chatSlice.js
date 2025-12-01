import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { chatAPI } from "../api/api";



const initialState = {
  channels: [],
  messages: [],
  currentChannelId: null,
  loading: false,
  error: null
};

