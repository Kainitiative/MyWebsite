<?php
/* ============================================================
   CONTACT FORM MAIL HANDLER
   ============================================================
   
   This script handles contact form submissions and sends them
   to your email address using your LetsHost mail server.
   
   SETUP:
   1. Upload this file to your hosting along with other files
   2. Make sure the form action points to "send-mail.php"
   3. Update the $to_email below to your email address
   
   ============================================================ */

// ============================================================
// CONFIGURATION - Update this email address
// ============================================================
$to_email = "hello@patrickryan.ie";
$email_subject_prefix = "Website Enquiry";

// ============================================================
// SECURITY: Only allow POST requests
// ============================================================
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.html");
    exit;
}

// ============================================================
// COLLECT AND SANITIZE FORM DATA
// ============================================================
$name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL) : '';
$phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
$business = isset($_POST['business']) ? htmlspecialchars(trim($_POST['business'])) : '';
$type = isset($_POST['type']) ? htmlspecialchars(trim($_POST['type'])) : '';
$message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';

// Handle checkbox array for "needs"
$needs = isset($_POST['needs']) ? $_POST['needs'] : array();
if (is_array($needs)) {
    $needs = array_map('htmlspecialchars', $needs);
    $needs_text = implode(', ', $needs);
} else {
    $needs_text = '';
}

// ============================================================
// VALIDATION
// ============================================================
$errors = array();

if (empty($name)) {
    $errors[] = "Name is required";
}

if (!$email) {
    $errors[] = "Valid email is required";
}

if (empty($phone)) {
    $errors[] = "Phone number is required";
}

// If validation fails, redirect back with error
if (!empty($errors)) {
    header("Location: index.html?error=1");
    exit;
}

// ============================================================
// BUILD EMAIL
// ============================================================
$subject = "$email_subject_prefix from $name";

$body = "New website enquiry received:\n\n";
$body .= "----------------------------------------\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Phone: $phone\n";

if (!empty($business)) {
    $body .= "Business: $business\n";
}

if (!empty($type)) {
    $body .= "Business Type: $type\n";
}

if (!empty($needs_text)) {
    $body .= "What they need: $needs_text\n";
}

$body .= "----------------------------------------\n\n";

if (!empty($message)) {
    $body .= "Message:\n$message\n\n";
}

$body .= "----------------------------------------\n";
$body .= "Sent from: www.patrickryan.ie\n";
$body .= "Time: " . date("d/m/Y H:i") . "\n";

// ============================================================
// EMAIL HEADERS
// ============================================================
$headers = "From: $to_email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ============================================================
// SEND EMAIL
// ============================================================
$mail_sent = mail($to_email, $subject, $body, $headers);

// ============================================================
// REDIRECT BASED ON RESULT
// ============================================================
if ($mail_sent) {
    // Success - redirect to thank you page
    header("Location: thanks.html");
} else {
    // Failed - redirect with error
    header("Location: index.html?error=mail");
}

exit;
?>
