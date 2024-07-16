import { test, expect } from "@playwright/test";

const userBody = { name: "Victor Casemiro", job: "QA" };
let userID;

test("Should create a new user", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/users", {
    data: userBody,
  });
  const responseData = await response.json();

  userID - responseData.id;

  expect(response.ok()).toBeTruthy();
  expect(responseData.name).toBe("Victor Casemiro");
  expect(responseData.job).toBe("QA");
});

test("Should upload the user created", async ({ request }) => {
  const response = await request.put(`https://reqres.in/api/users/${userID}`, {
    data: { job: "Tester" },
  });
  const responseData = await response.json();

  expect(response.ok()).toBeTruthy();
  expect(responseData.job).toBe("Tester");
});

test("Should delete the user created", async ({ request }) => {
  const response = await request.delete(
    `https://reqres.in/api/users/${userID}`
  );

  expect(response.status()).toBe(204);
});
