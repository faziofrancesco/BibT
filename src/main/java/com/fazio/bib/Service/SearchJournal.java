package com.fazio.bib.Service;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

public class SearchJournal {
    private WebDriver driver;

    public SearchJournal() throws InterruptedException {
        System.setProperty("webdriver.gecko.driver", "src/main/resources/geckodriver.exe");
        FirefoxOptions options = new FirefoxOptions();
        options.addArguments("--window-size=1920,1200", "--ignore-certificate-errors", "--disable-extensions");
        driver = new FirefoxDriver(options);
        driver.get("https://www.google.it/");

        Thread.sleep(2000);
    }

    public void SetJournal(String journal) throws InterruptedException {
        Thread.sleep(2000);
        driver.findElement(By.xpath("//*[@id=\"tsf\"]/div[2]/div[1]/div[1]/div/div[2]/input")).sendKeys(journal);
        driver.findElement(By.xpath("//*[@id=\"tsf\"]/div[2]/div[1]/div[3]/center/input[1]")).click();
    }

    public void GoPage() {
        driver.findElement(By.xpath("//*[@id=\"rso\"]/div[1]/div/div[1]/a/h3/span")).click();
    }
}
