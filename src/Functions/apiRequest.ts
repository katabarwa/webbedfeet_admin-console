type TApiRequest = (
  urlPath: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  body?: any | FormData,
  isFileUpload?: boolean
) => Promise<any>;

const apiRequest: TApiRequest = async (
  urlPath,
  method,
  body,
  isFileUpload = false
) => {
  const url = process.env.REACT_APP_API_URL + urlPath;

  let params: any = {};
  if (method === "GET")
    params = {
      method: method,
      credentials: "include",
    }; //GET requests do not include headers and body

  if (method !== "GET") {
    params = {
      method: method,
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
      body: isFileUpload ? body : JSON.stringify(body),
    }; //POST|PATCH|DELETE can include headers and body

    //If it is NOT a file upload set header "Content-Type" to "application/json"; file uploads are usually form data not json
    if (!isFileUpload) params.headers["Content-Type"] = "application/json";
  }

  try {
    const RESPONSE = await fetch(url, params);
    return RESPONSE.json();
  } catch (error) {
    console.error(`apiRequest: ${error.message}`);
    return {
      success: false,
      message: "Could not connect to the server",
    };
  }
};

export default apiRequest;
