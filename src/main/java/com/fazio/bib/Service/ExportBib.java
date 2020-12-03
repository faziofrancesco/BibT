package com.fazio.bib.Service;

import com.fazio.bib.entity.*;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ExportBib {
    private WebDriver driver;

    public ExportBib() throws InterruptedException {
        System.setProperty("webdriver.gecko.driver", "src/main/resources/geckodriver.exe");
        FirefoxOptions options = new FirefoxOptions();
        //options.addArguments("--window-size=1920,1200", "--ignore-certificate-errors", "--disable-extensions");
        options.addArguments("--window-size=1920,1200", "--headless", "--ignore-certificate-errors", "--disable-extensions");
        driver = new FirefoxDriver(options);
        driver.manage().window().setPosition(new Point(0, 0));
        driver.manage().window().setSize(new Dimension(1920 / 2, 1200));
        driver.get("https://truben.no/latex/bibtex/");
        Thread.sleep(2000);
    }

    public void SetType(String t) {
        new WebDriverWait(driver, 100).until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/nav/div[2]/ul[1]/li/a")));
        driver.findElement(By.xpath("/html/body/nav/div[2]/ul[1]/li/a")).click();
        if (t.equals(driver.findElement(By.xpath("/html/body/nav/div[2]/ul[1]/li/ul/li/a[1]")).getText().toLowerCase())) {
            driver.findElement(By.xpath("/html/body/nav/div[2]/ul[1]/li/ul/li/a[1]")).click();
            System.out.println("art");
        }
        if (t.equals(driver.findElement(By.xpath("/html/body/nav/div[2]/ul[1]/li/ul/li/a[2]")).getText().toLowerCase())) {
            driver.findElement(By.xpath("/html/body/nav/div[2]/ul[1]/li/ul/li/a[2]")).click();
            System.out.println("book");

        }
        if (t.equals(driver.findElement(By.xpath("/html/body/nav/div[2]/ul[1]/li/ul/li/a[7]")).getText().toLowerCase())) {
            driver.findElement(By.xpath("/html/body/nav/div[2]/ul[1]/li/ul/li/a[7]")).click();
            System.out.println("inp");

        }
        if (t.equals(driver.findElement(By.xpath("/html/body/nav/div[2]/ul[1]/li/ul/li/a[10]")).getText().toLowerCase())) {
            driver.findElement(By.xpath("/html/body/nav/div[2]/ul[1]/li/ul/li/a[10]")).click();
            System.out.println("misc");

        }
    }

    public String GetAttributes(Citation citation) {
        if (citation instanceof Misc) {
            Misc m = (Misc) citation;
            if (m.getAuthor() != null)
                driver.findElement(By.xpath("//*[@id=\"Author\"]")).sendKeys(m.getAuthor());
            if (m.getTitle() != null)
                driver.findElement(By.xpath("//*[@id=\"Title\"]")).sendKeys(m.getTitle());
            if (m.getHowpublished() != null)
                driver.findElement(By.xpath("//*[@id=\"HowPublished\"]")).sendKeys(m.getHowpublished());
            if (m.getYear() != null)
                driver.findElement(By.xpath("//*[@id=\"Year\"]")).sendKeys(m.getYear().toString());
            if (m.getNote() != null)
                driver.findElement(By.xpath("//*[@id=\"Note\"]")).sendKeys(m.getNote());
        }
        if (citation instanceof Article) {
            Article c = (Article) citation;
            if (c.getAuthor() != null)
                driver.findElement(By.xpath("//*[@id=\"Author\"]")).sendKeys(c.getAuthor());
            if (c.getTitle() != null)
                driver.findElement(By.xpath("//*[@id=\"Title\"]")).sendKeys(c.getTitle());
            if (c.getJournal() != null)
                driver.findElement(By.xpath("//*[@id=\"Journal\"]")).sendKeys(c.getJournal());
            if (c.getYear() != null)
                driver.findElement(By.xpath("//*[@id=\"Year\"]")).sendKeys(c.getYear().toString());
            if (c.getNumber() != null)
                driver.findElement(By.xpath("//*[@id=\"Number\"]")).sendKeys(c.getNumber());
            if (c.getVolume() != null)
                driver.findElement(By.xpath("//*[@id=\"Volume\"]")).sendKeys(c.getVolume());
            if (c.getPages() != null)
                driver.findElement(By.xpath("//*[@id=\"Pages\"]")).sendKeys(c.getPages());
        }
        if (citation instanceof Inproceedings) {
            Inproceedings c = (Inproceedings) citation;
            if (c.getAuthor() != null)
                driver.findElement(By.xpath("//*[@id=\"Author\"]")).sendKeys(c.getAuthor());
            if (c.getTitle() != null)
                driver.findElement(By.xpath("//*[@id=\"Title\"]")).sendKeys(c.getTitle());
            if (c.getAddress() != null)
                driver.findElement(By.xpath("//*[@id=\"Address\"]")).sendKeys(c.getAddress());
            if (c.getYear() != null)
                driver.findElement(By.xpath("//*[@id=\"Year\"]")).sendKeys(c.getYear().toString());
            if (c.getSeries() != null)
                driver.findElement(By.xpath("//*[@id=\"Series\"]")).sendKeys(c.getSeries());
            if (c.getBooktitle() != null)
                driver.findElement(By.xpath("//*[@id=\"BookTitle\"]")).sendKeys(c.getBooktitle());
            if (c.getPages() != null)
                driver.findElement(By.xpath("//*[@id=\"Pages\"]")).sendKeys(c.getPages());
            if (c.getPublisher() != null)
                driver.findElement(By.xpath("//*[@id=\"Publisher\"]")).sendKeys(c.getPublisher());
        }
        if (citation instanceof Book) {
            Book c = (Book) citation;
            if (c.getAuthor() != null)
                driver.findElement(By.xpath("//*[@id=\"Author\"]")).sendKeys(c.getAuthor());
            if (c.getTitle() != null)
                driver.findElement(By.xpath("//*[@id=\"Title\"]")).sendKeys(c.getTitle());
            if (c.getAddress() != null)
                driver.findElement(By.xpath("//*[@id=\"Address\"]")).sendKeys(c.getAddress());
            if (c.getYear() != null)
                driver.findElement(By.xpath("//*[@id=\"Year\"]")).sendKeys(c.getYear().toString());
            if (c.getPublisher() != null)
                driver.findElement(By.xpath("//*[@id=\"Publisher\"]")).sendKeys(c.getPublisher());
        }
        driver.findElement(By.xpath("/html/body/div[2]/div/div[2]/section/form/div[1]/div[2]/div/span/button")).click();
        try {

            return driver.findElement(By.xpath("//*[@id=\"output\"]")).getText();
        } finally {
            driver.close();
        }

    }

}
