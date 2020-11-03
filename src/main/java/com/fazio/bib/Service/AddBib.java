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

    public void setUrl(String url) {
        driver.get(url);
    }

    public String GetText(String title) throws InterruptedException {
        Thread.sleep(10000);
        //*[@id="gs_res_ccl_mid"]/div[2]/div[2]/div[3]/a[2]
        if (title.equals(driver.findElement(By.xpath("//div[@data-rp='0']/div[@class='gs_ri']/h3")).getText())) {
            new WebDriverWait(driver, 100).until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='gs_res_ccl_mid']/div[2]/div[2]/div[3]/a[2]")));
            driver.findElement(By.xpath("//*[@id='gs_res_ccl_mid']/div[2]/div[2]/div[3]/a[2]")).click();
            new WebDriverWait(driver, 100).until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='gs_citi']/a[1]")));
            driver.findElement(By.xpath("//*[@id='gs_citi']/a[1]")).click();
            Thread.sleep(2000);
            return driver.findElement(By.xpath("/html/body/pre")).getText();
        }
        if (title.equals(driver.findElement(By.xpath("//div[@data-rp='1']/div[@class='gs_ri']/h3")).getText())) {
            Thread.sleep(10000);
            new WebDriverWait(driver, 100).until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='gs_res_ccl_mid']/div[3]/div[2]/div[3]/a[2]")));
            driver.findElement(By.xpath("//*[@id='gs_res_ccl_mid']/div[3]/div[2]/div[3]/a[2]")).click();
            new WebDriverWait(driver, 100).until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='gs_citi']/a[1]")));
            driver.findElement(By.xpath("//*[@id='gs_citi']/a[1]")).click();
            Thread.sleep(5000);
            return driver.findElement(By.xpath("/html/body/pre")).getText();
        }
        return "0";
    }

    public void Close() {
        driver.close();
    }
}
