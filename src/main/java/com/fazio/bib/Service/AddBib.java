package com.fazio.bib.Service;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class AddBib {
    private WebDriver driver;

    public AddBib() throws InterruptedException {
        System.setProperty("webdriver.gecko.driver", "src/main/resources/geckodriver.exe");
        FirefoxOptions options = new FirefoxOptions();
        options.addArguments("--window-size=1920,1200", "--ignore-certificate-errors", "--disable-extensions");
        driver = new FirefoxDriver(options);
        driver.manage().window().setPosition(new Point(0, 0));
        driver.manage().window().setSize(new Dimension(1920 / 2, 1200));
        driver.get("https://scholar.google.com/");

        Thread.sleep(2000);
    }

    public void setTitle(String title) throws InterruptedException {
        Thread.sleep(2000);
        driver.findElement(By.xpath("//*[@id=\"gs_hdr_tsi\"]")).sendKeys(title);
        driver.findElement(By.xpath("//*[@id=\"gs_hdr_tsb\"]/span/span[1]")).click();
    }

    public String GetText() throws InterruptedException {
        new WebDriverWait(driver, 100).until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id=\"gs_res_ccl_mid\"]/div/div[2]/div[3]/a[2]")));
        driver.findElement(By.xpath("//*[@id=\"gs_res_ccl_mid\"]/div/div[2]/div[3]/a[2]")).click();
        new WebDriverWait(driver, 100).until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/div/div[4]/div/div[2]/div/div[2]/a[1]")));
        driver.findElement(By.xpath("/html/body/div/div[4]/div/div[2]/div/div[2]/a[1]")).click();
        Thread.sleep(2000);
        return driver.findElement(By.xpath("/html/body/pre")).getText();
    }

    public void Close() {
        driver.close();
    }
}
