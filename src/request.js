// src/request.js
import axios from "axios";

export async function makeRequest(method, url, data = null) {
  const start = Date.now();

  try {
    const response = await axios({
      method,
      url,
      data
    });

    const time = Date.now() - start;

    return {
      success: true,
      status: response.status,
      time,
      data: response.data
    };
  } catch (error) {
    const time = Date.now() - start;

    return {
      success: false,
      time,
      message: error.message
    };
  }
}