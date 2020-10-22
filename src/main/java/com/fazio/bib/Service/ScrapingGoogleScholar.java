package com.fazio.bib.Service;

import com.fazio.bib.Controller.TreeB;
import com.fazio.bib.entity.BinaryTree;
import com.fazio.bib.entity.GoogleScholar;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

import java.util.ArrayList;

public class ScrapingGoogleScholar {
    private static TreeB father1;
    private TreeB father;
    WebDriver driver;
    private ArrayList<BinaryTree> list = new ArrayList<BinaryTree>();


    public ScrapingGoogleScholar() throws InterruptedException {


        System.setProperty("webdriver.gecko.driver", "src/main/resources/geckodriver.exe");
        FirefoxOptions options = new FirefoxOptions();
        //options.addArguments("--disable-gpu", "--window-size=1920,1200", "--ignore-certificate-errors", "--headless", "--disable-infobars", "--disable-extensions");
        options.addArguments("--window-size=1920,1200", "--ignore-certificate-errors", "--disable-extensions");

        driver = new FirefoxDriver(options);
        driver.navigate().to("https://scholar.google.com/");
        driver.manage().window().fullscreen();

        Thread.sleep(4000);

    }

    //*[@id="rc-anchor-container"]
    public void SetTitle(String Title) throws InterruptedException {
        Thread.sleep(2000);
        driver.findElement(By.xpath("//*[@id=\"gs_hdr_tsi\"]")).sendKeys(Title);
        driver.findElement(By.xpath("//*[@id=\"gs_hdr_tsb\"]/span/span[1]")).click();
    }

    public GoogleScholar FirstResult() throws InterruptedException {
        Thread.sleep(1000);
        String t1 = driver.findElement(By.xpath("/html/body/div/div[10]/div[2]/div[2]/div[2]/div[1]/div[2]/h3/a")).getText();
        String a1 = driver.findElement(By.xpath("/html/body/div/div[10]/div[2]/div[2]/div[2]/div[1]/div[2]/div[1]")).getText();
        String i1 = driver.findElement(By.xpath("/html/body/div/div[10]/div[2]/div[2]/div[2]/div[1]/div[2]/div[2]")).getText();
        return new GoogleScholar(t1, a1, i1);
    }


    public GoogleScholar SecondResult() throws InterruptedException {

        Thread.sleep(1000);
        String t2 = driver.findElement(By.xpath("/html/body/div/div[10]/div[2]/div[2]/div[2]/div[3]/div[2]/h3/a")).getText();
        String a2 = driver.findElement(By.xpath("/html/body/div/div[10]/div[2]/div[2]/div[2]/div[3]/div[2]/div[1]")).getText();
        String i2 = driver.findElement(By.xpath("/html/body/div/div[10]/div[2]/div[2]/div[2]/div[3]/div[2]/div[2]")).getText();
        return new GoogleScholar(t2, a2, i2);
    }

    public void BinaryThree(int profondita) throws InterruptedException {
        int cont = 0;
        while (profondita != cont) {

            driver.findElement(By.xpath("//*[@id=\"gs_res_ccl_mid\"]/div[1]/div[2]/div[3]/a[3]")).click();
            Thread.sleep(2000);
            TreeB figlio1 = new TreeB(FirstResult().getTitle(), null);
            Thread.sleep(2000);
            TreeB figlio2 = new TreeB(SecondResult().getTitle(), null);
            ArrayList<TreeB> child = new ArrayList<>();
            child.add(figlio1);
            child.add(figlio2);
            father.setChildren(child);
            father = figlio1;
            cont++;

        }

    }

    public void Root() {
        String t = driver.findElement(By.xpath("//*[@id=\"-uKD6GV8PjEJ\"]")).getText();
        String a = driver.findElement(By.xpath("//*[@id=\"gs_res_ccl_mid\"]/div[1]/div[2]/div[1]")).getText();
        String i = driver.findElement(By.xpath("//*[@id=\"gs_res_ccl_mid\"]/div[1]/div[2]/div[2]")).getText();
        GoogleScholar gs = new GoogleScholar(t, a, i);
        father = new TreeB(gs.getTitle(), null);
        father1 = father;

    }


    public TreeB Scraping(int profondita, String title) throws InterruptedException {

        this.SetTitle(title);
        this.Root();
        this.BinaryThree(profondita);
        driver.close();

        ArrayList<TreeB> tb = new ArrayList<>();
        BinNode dad = new BinNode(null, null, null);

        return father1;
    }


}
