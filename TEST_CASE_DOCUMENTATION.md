# Test Case: E-Commerce End-to-End Workflow

## Target Application

https://demowebshop.tricentis.com/

## Test Case Attributes

| #   | Attribute             | Value                                                                                                                                                                    |
| --- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Test Case ID**      | ECOM_1                                                                                                                                                                   |
| 2   | **Test Case Name**    | E-Commerce Purchase Workflow - Notebook >$900 and Cell Phone >$90                                                                                                        |
| 3   | **Priority**          | High                                                                                                                                                                     |
| 4   | **Test Type**         | Functional, End-to-End                                                                                                                                                   |
| 5   | **Test Environment**  | Web                                                                                                                                                                      |
| 6   | **Prerequisites**     | Browser configured, Internet connection stable                                                                                                                           |
| 7   | **Test Data**         | Valid email, password, notebook >$900, cell phone >$90                                                                                                                   |
| 8   | **Expected Duration** | less than 5 minutes                                                                                                                                                      |
| 9   | **Automation Status** | Automated (Playwright)                                                                                                                                                   |
| 10  | **Author**            | QA Team                                                                                                                                                                  |
| 11  | **Created Date**      | 2026-02-09                                                                                                                                                               |
| 12  | **Risk Level**        | Low (demo environment)                                                                                                                                                   |
| 13  | **Dependencies**      | None                                                                                                                                                                     |
| 14  | **Objective**         | Verify complete e-commerce workflow: registration, browsing, adding high-value notebook (>$900) and cell phone (>$90) to cart, CRUD operations, and checkout completion. |

| #   | Step                               | Action                                      | Expected Result                                       |
| --- | ---------------------------------- | ------------------------------------------- | ----------------------------------------------------- |
| 1   | **Navigate to Home**               | Open https://demowebshop.tricentis.com/     | Home page loads with logo visible                     |
| 2   | **Verify Navigation**              | Check header menu is visible                | Navigation menu displayed                             |
| 3   | **Click Register**                 | Click "Register" link in header             | Registration page opens                               |
| 4   | **Fill Registration Form**         | Enter gender, first name, last name         | Gender and name fields populated                      |
| 5   | **Enter Email**                    | Input unique email address                  | Email field accepts valid format                      |
| 6   | **Enter Password**                 | Input password and confirm                  | Password fields accept input                          |
| 7   | **Submit Registration**            | Click "Register" button                     | Registration form submitted                           |
| 8   | **Verify Registration Success**    | Check success message                       | "Your registration completed" message displayed       |
| 9   | **Verify Email Header**            | Check header shows email                    | User email visible in account section                 |
| 10  | **Navigate to Computers**          | Click "Computers" category                  | Computers page loads                                  |
| 11  | **Open Notebooks**                 | Click "Notebooks" subcategory               | Notebooks listing displays                            |
| 12  | **Find Notebook >$900**            | Find notebook priced above $900             | Notebook found with price >$900                       |
| 13  | **Open Notebook Details**          | Click on notebook                           | Product detail page opens                             |
| 14  | **Verify Notebook Page**           | Check product name on page                  | Correct notebook displayed                            |
| 15  | **Add Notebook to Cart (Create)**  | Click "Add to cart" button                  | Success notification, cart badge shows (1)            |
| 16  | **Navigate to Electronics**        | Click "Electronics" category                | Electronics page loads                                |
| 17  | **Open Cell Phones**               | Click "Cell phones" subcategory             | Cell phones listing displays                          |
| 18  | **Find Cell Phone >$90**           | Find cell phone priced above $90            | Cell phone found with price >$90                      |
| 19  | **Open Cell Phone Details**        | Click on cell phone                         | Product detail page opens                             |
| 20  | **Verify Cell Phone Page**         | Check product name on page                  | Correct cell phone displayed                          |
| 21  | **Add Cell Phone to Cart (Create)** | Click "Add to cart" button                  | Success notification, cart badge shows (2)            |
| 22  | **View Cart (Read)**               | Click shopping cart link                    | Cart page opens                                       |
| 23  | **Verify Item Count (Read)**       | Count items in cart                         | 2 items present in cart                               |
| 24  | **Verify Total Amount (Read)**     | Check total price                           | Total >$990, matches sum of notebook + cell phone     |
| 25  | **Update Quantity (Update)**       | Change notebook quantity to 2, click update | Update action executed                                |
| 26  | **Verify Updated Quantity (Read)** | Check notebook quantity                     | Quantity shows 2                                      |
| 27  | **Verify Recalculated Total (Read)** | Check new total price                       | Total = (notebook × 2) + cell phone                   |
| 28  | **Remove Cell Phone (Delete)**     | Check remove box for cell phone, click update | Cell phone removal executed                           |
| 29  | **Verify Remaining Items (Read)**  | Check cart contents                         | Only notebook remains, cell phone gone, count = 1     |
| 30  | **Proceed to Checkout**            | Check terms, click "Checkout"               | Checkout page loads with billing form                 |
| 31  | **Fill Country**                   | Select country from dropdown                | Country selected                                      |
| 32  | **Fill City**                      | Enter city name                             | City field populated                                  |
| 33  | **Fill Address**                   | Enter street address                        | Address field populated                               |
| 34  | **Fill Zip Code**                  | Enter postal code                           | Zip code entered                                      |
| 35  | **Fill Phone**                     | Enter phone number                          | Phone number entered                                  |
| 36  | **Continue Billing**               | Click "Continue" button                     | Shipping address section appears                      |
| 37  | **Continue Shipping Address**      | Click "Continue" on shipping address        | Shipping method selection appears                     |
| 38  | **Continue Shipping Method**       | Select and continue shipping method         | Payment method selection appears                      |
| 39  | **Continue Payment Method**        | Select and continue payment method          | Order review page displays                            |
| 40  | **Verify Billing Info**            | Check city and address on review            | City and address displayed correctly                  |
| 41  | **Verify Order Items**             | Check product name in order                 | Notebook name visible in order table                  |
| 42  | **Confirm Order**                  | Click "Confirm" button                      | Order submitted                                       |
| 43  | **Verify Order Completion**        | Check completion page and URL               | "Your order has been successfully processed!" message |
| 44  | **Verify Order Number**            | Check order number format                   | Order number displayed (format: "Order number: ###")  |

## Navigation Steps Summary

- Home page → Register → Computers → Notebooks → Product Details → Add to Cart (1)
- Electronics → Cell Phones → Product Details → Add to Cart (2) → Shopping Cart
- Cart Operations: Verify (Read), Update Quantity, Verify Total, Remove Item, Verify Final State
- Checkout → Billing → Shipping Address → Shipping Method → Payment → Review → Confirm

## CRUD Operations Coverage

| Operation  | Steps               | Description                                    |
| ---------- | ------------------- | ---------------------------------------------- |
| **Create** | 15, 21              | Add notebook and cell phone to shopping cart   |
| **Read**   | 22, 23, 24, 26, 27, 29 | View cart, verify items, quantities, and totals |
| **Update** | 25                  | Modify notebook quantity from 1 to 2           |
| **Delete** | 28                  | Remove cell phone from cart                    |

## Test Data

- **Email**: testuser\_[timestamp]@test.com
- **Password**: SecurePass123!
- **Products**: Notebook >$900 from Notebooks category, Cell Phone >$90 from Cell Phones category
- **Address**: Country: US, City: New York, Address: 123 Test St, Zip: 10001, Phone: +1-555-0123

## Pass Criteria

✓ All 44 steps execute successfully  
✓ User registration and login verified with email in header  
✓ High-value notebook (>$900) and cell phone (>$90) found and added to cart  
✓ All CRUD operations work correctly (Create: add items, Read: verify cart, Update: quantity, Delete: remove item)  
✓ Cart totals calculate correctly before and after update  
✓ Checkout completes with billing info displayed on review page  
✓ Order confirmation received with order number in correct format
