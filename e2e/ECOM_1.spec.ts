import { test, expect } from '@playwright/test';
import {
  generateTestUserData,
  parsePrice,
  selectProductByPrice,
  addProductToCart,
  updateCartItemQuantity,
  removeCartItem,
  getCartItemQuantity,
  registerUser,
  fillBillingAddress,
  completeCheckoutSteps,
  proceedToCheckout,
  confirmOrder,
  getOrderNumber,
  navigateToSection,
  navigateToHome,
} from './utils';
import { ECOM_SELECTORS, URL_PATTERNS, APP_CONFIG } from './constants';

test('ECOM_1: E-Commerce Purchase Workflow - Notebook >$900 and Cell Phone >$90', async ({
  page,
}) => {
  const testData = generateTestUserData();

  // Step 1-2: Navigate to home and verify
  await navigateToHome(page, APP_CONFIG.ECOM_BASE_URL, ECOM_SELECTORS.HEADER.LOGO);
  await expect(page.locator(ECOM_SELECTORS.HEADER.MENU)).toBeVisible();

  // Step 3-4: Navigate to registration
  await navigateToSection(page, ECOM_SELECTORS.NAV.REGISTER, URL_PATTERNS.REGISTER);

  // Step 5-10: Register user
  await registerUser(page, testData);
  await expect(page.locator(ECOM_SELECTORS.REGISTRATION.SUCCESS_MESSAGE)).toContainText(
    'Your registration completed'
  );

  // Step 11: Verify logged in email
  await expect(page.locator(ECOM_SELECTORS.HEADER.ACCOUNT)).toContainText(testData.email);

  // Step 12: Navigate to Computers
  await navigateToSection(page, ECOM_SELECTORS.NAV.COMPUTERS, URL_PATTERNS.COMPUTERS);

  // Step 13: Open Notebooks
  await navigateToSection(page, ECOM_SELECTORS.NAV.NOTEBOOKS, URL_PATTERNS.NOTEBOOKS);

  // Step 14: Select notebook >$900
  const notebook = await selectProductByPrice(page, 900);
  expect(notebook).not.toBeNull();
  expect(notebook!.price).toBeGreaterThan(900);

  // Step 15: Verify product page
  await expect(page.locator(ECOM_SELECTORS.PRODUCT.NAME_HEADING)).toContainText(notebook!.name);

  // Step 16: Add notebook to cart (Create)
  await addProductToCart(page);
  await expect(page.locator(ECOM_SELECTORS.CART.QUANTITY_BADGE)).toContainText('(1)');

  // Step 17: Navigate to Electronics
  await navigateToSection(page, ECOM_SELECTORS.NAV.ELECTRONICS, URL_PATTERNS.ELECTRONICS);

  // Step 18: Open Cell Phones
  await navigateToSection(page, ECOM_SELECTORS.NAV.CELL_PHONES, URL_PATTERNS.CELL_PHONES);

  // Step 19: Select cell phone >$90
  const cellPhone = await selectProductByPrice(page, 90);
  expect(cellPhone).not.toBeNull();
  expect(cellPhone!.price).toBeGreaterThan(90);

  // Step 20: Verify product page
  await expect(page.locator(ECOM_SELECTORS.PRODUCT.NAME_HEADING)).toContainText(cellPhone!.name);

  // Step 21: Add cell phone to cart (Create)
  await addProductToCart(page);
  await expect(page.locator(ECOM_SELECTORS.CART.QUANTITY_BADGE)).toContainText('(2)');

  // Step 22: View cart (Read)
  await navigateToSection(page, ECOM_SELECTORS.NAV.CART, URL_PATTERNS.CART);

  // Step 23: Verify 2 items in cart (Read)
  const cartItems = await page.locator(ECOM_SELECTORS.CART.ITEM_ROW).count();
  expect(cartItems).toBe(2);

  // Step 24: Verify total >$990 (Read)
  const totalText = await page.locator(ECOM_SELECTORS.CART.TOTAL_PRICE).textContent();
  const totalAmount = parsePrice(totalText);
  expect(totalAmount).toBeGreaterThan(990);
  const expectedTotal = notebook!.price + cellPhone!.price;
  expect(totalAmount).toBeCloseTo(expectedTotal, 2);

  // Step 25: Update notebook quantity to 2 (Update)
  await updateCartItemQuantity(page, notebook!.name, 2);

  // Step 26: Verify updated quantity (Read)
  const updatedQty = await getCartItemQuantity(page, notebook!.name);
  expect(updatedQty).toBe(2);

  // Step 27: Verify recalculated total (Read)
  const newTotalText = await page.locator(ECOM_SELECTORS.CART.TOTAL_PRICE).textContent();
  const newTotalAmount = parsePrice(newTotalText);
  const expectedNewTotal = notebook!.price * 2 + cellPhone!.price;
  expect(newTotalAmount).toBeCloseTo(expectedNewTotal, 2);

  // Step 28: Remove cell phone from cart (Delete)
  await removeCartItem(page, cellPhone!.name);

  // Step 29: Verify only notebook remains (Read)
  const remainingItems = await page.locator(ECOM_SELECTORS.CART.ITEM_ROW).count();
  expect(remainingItems).toBe(1);
  await expect(page.locator(ECOM_SELECTORS.CART.ITEM_ROW)).toContainText(notebook!.name);
  await expect(page.locator(ECOM_SELECTORS.CART.ITEM_ROW)).not.toContainText(cellPhone!.name);
 
  // Step 30: Accept terms and proceed to checkout
  await proceedToCheckout(page);
  await expect(page).toHaveURL(URL_PATTERNS.CHECKOUT);

  // Step 31-35: Fill billing address
  await fillBillingAddress(page, testData);

  // Step 36-39: Complete checkout steps
  await completeCheckoutSteps(page);

  // Step 40: Verify billing info on review
  await expect(page.locator(ECOM_SELECTORS.BILLING.INFO_DISPLAY)).toContainText(testData.city);
  await expect(page.locator(ECOM_SELECTORS.BILLING.INFO_DISPLAY)).toContainText(testData.address);

  // Step 41: Verify order items
  await expect(page.locator(ECOM_SELECTORS.ORDER.CART_TABLE)).toContainText(notebook!.name);

  // Step 42: Confirm order
  await confirmOrder(page);

  // Step 43: Verify order completion
  await expect(page).toHaveURL(URL_PATTERNS.ORDER_COMPLETED);
  await expect(page.locator(ECOM_SELECTORS.ORDER.COMPLETION_TITLE)).toContainText(
    'Your order has been successfully processed!'
  );

  // Step 44: Verify order number
  const orderNumberText = await getOrderNumber(page);
  expect(orderNumberText).toMatch(/Order number: \d+/);
});
