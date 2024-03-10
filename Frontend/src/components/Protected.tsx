import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

interface ProtectedProps {
  token: string;
}

const Protected: React.FC<ProtectedProps> = ({ token }) => {
  const isRun = useRef(false);

  const [data, setData] = useState<string[] | null>(null);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    axios
      .get<string[]>("/documents", config)
      .then((res:any) => setData(res.data))
      .catch((err:any) => console.error(err));
  }, [token]);

  return data ? (
    <>
      {data.map((rec, i) => (
        <h3 key={i}>{rec}</h3>
      ))}
    </>
  ) : (
    <div>Protected</div>
  );
};

export default Protected;
