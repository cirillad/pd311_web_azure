import React, { useState } from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    Link,
    IconButton,
    Alert,
    Snackbar,
} from "@mui/material";
import { styled } from "@mui/system";
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaYoutube,
} from "react-icons/fa";

const StyledFooter = styled(Box)(({ theme }) => ({
    // backgroundColor: "#1a237e",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.main,
    padding: "64px 0 32px",
    position: "relative",
    overflow: "hidden",
}));

const FooterLink = styled(Link)(({ theme }) => ({
    color: theme.palette.text.main,
    textDecoration: "none",
    transition: "color 0.3s ease",
    "&:hover": {
        color: "#90caf9",
    },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.light,
    transition: "transform 0.3s ease, color 0.3s ease",
    "&:hover": {
        color: "#90caf9",
        transform: "scale(1.1)",
    },
}));

const GetStartedButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#ff4081",
    color: "#ffffff",
    padding: "12px 32px",
    borderRadius: "25px",
    transition: "all 0.3s ease",
    "&:hover": {
        backgroundColor: "#f50057",
        transform: "translateY(-2px)",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    },
}));

const Footer = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubscribe = () => {
        if (!validateEmail(email)) {
            setEmailError(true);
            return;
        }
        setEmailError(false);
        setOpenSnackbar(true);
        setEmail("");
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const footerLinks = {
        Product: ["Features", "Pricing", "Security", "Updates"],
        "Use Cases": ["Startups", "Enterprise", "Government", "Education"],
        Resources: ["Documentation", "Tutorials", "Blog", "Support"],
        Company: ["About Us", "Careers", "Contact", "Partners"],
    };

    return (
        <StyledFooter>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Box mb={3}>
                            <img
                                src="images.unsplash.com/photo-1563906267088-b029e7101114"
                                alt="Company Logo"
                                style={{ height: "40px", marginBottom: "16px" }}
                            />
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Transform your business with our innovative solutions.
                            </Typography>
                            <GetStartedButton variant="contained">
                                Get Started
                            </GetStartedButton>
                        </Box>
                    </Grid>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <Grid item xs={6} sm={3} md={2} key={category}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                {category}
                            </Typography>
                            {links.map((link) => (
                                <Box key={link} mb={1}>
                                    <FooterLink href="#">{link}</FooterLink>
                                </Box>
                            ))}
                        </Grid>
                    ))}

                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Subscribe to Our Newsletter
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={emailError}
                                helperText={emailError && "Please enter a valid email address"}
                                sx={{
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    borderRadius: 1,
                                    "& .MuiOutlinedInput-root": {
                                        color: "white",
                                    },
                                }}
                            />
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={handleSubscribe}
                                sx={{ borderRadius: 2 }}
                            >
                                Subscribe
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                borderTop: "1px solid rgba(255,255,255,0.1)",
                                paddingTop: 3,
                                marginTop: 3,
                            }}
                        >
                            <Typography variant="body2">
                                © {new Date().getFullYear()} Your Company. All rights reserved.
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <SocialButton aria-label="Facebook">
                                    <FaFacebook />
                                </SocialButton>
                                <SocialButton aria-label="Twitter">
                                    <FaTwitter />
                                </SocialButton>
                                <SocialButton aria-label="Instagram">
                                    <FaInstagram />
                                </SocialButton>
                                <SocialButton aria-label="LinkedIn">
                                    <FaLinkedin />
                                </SocialButton>
                                <SocialButton aria-label="YouTube">
                                    <FaYoutube />
                                </SocialButton>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Thank you for subscribing to our newsletter!
                </Alert>
            </Snackbar>
        </StyledFooter>
    );
};

export default Footer;