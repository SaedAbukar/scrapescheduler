const cron = require("node-cron");
const scrapeJobs = require("./scraperManager"); // Adjust path if needed

// Define the list of search terms and cities
const searchTerms = [
  "technology",
  "design",
  "marketing",
  "finance",
  "teknologia",
  "education",
  "finanssi",
  "business",
  "markkinointi",
  "opetus",
  "software",
  "ohjelmointi",
  "it",
  "myyjä",
  "asiakaspalvelu",
  "",
];

const cities = ["helsinki", "suomi", ""];

// Utility function to shuffle an array randomly
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const fiveseconds = "*/5 * * * * *";
const thirtyseconds = "*/30 * * * * *";
const fivehours = "0 */5 * * *";
const threehours = "0 */3 * * *";

// Function to set up and run the cron job
const startJobScrapingCron = () => {
  // Schedule job scraping every 3 hours
  cron.schedule(threehours, async () => {
    console.log("Running the scheduled scraping job...");

    try {
      // Shuffle the searchTerms and cities arrays before scraping
      const randomizedSearchTerms = shuffleArray([...searchTerms]);
      const randomizedCities = shuffleArray([...cities]);

      // Loop through each combination of randomized search term and city
      for (const searchTerm of randomizedSearchTerms) {
        for (const city of randomizedCities) {
          console.log(
            `Scraping for searchTerm: "${searchTerm}", city: "${city}"`
          );
          const page = 1; // Default page for now (can modify to handle pagination)

          try {
            // Run the scraper for the current search term and city
            const result = await scrapeJobs(city, searchTerm, page);
            console.log(result.message);
          } catch (error) {
            console.error(
              `Error scraping for searchTerm: "${searchTerm}", city: "${city}" - ${error.message}`
            );
          }
        }
      }
    } catch (error) {
      console.error("Error running the scheduled scraping job:", error.message);
    }
  });
};

module.exports = startJobScrapingCron;
