package com.fazio.bib.Service;

import com.fazio.bib.entity.GoogleScholar;
import javafx.util.Pair;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

import java.util.ArrayList;

@Slf4j
public class ScrapingGoogleScholar {
    WebDriver driver;
    private ArrayList<Nodes> nodes = new ArrayList<>();
    private ArrayList<Links> links = new ArrayList<>();
    private ArrayList<String> titles = new ArrayList<>();
    private int prec;
    private ArrayList<Integer> ids = new ArrayList<>();

    public ScrapingGoogleScholar() throws InterruptedException {


        System.setProperty("webdriver.gecko.driver", "src/main/resources/geckodriver.exe");
        FirefoxOptions options = new FirefoxOptions();
        //options.addArguments("--disable-gpu", "--window-size=1920,1200", "--ignore-certificate-errors", "--headless", "--disable-infobars", "--disable-extensions");
        options.addArguments("--window-size=1920,1200", "--ignore-certificate-errors", "--disable-extensions");

        driver = new FirefoxDriver(options);
        driver.navigate().to("https://scholar.google.com/");
        driver.manage().window().fullscreen();

        Thread.sleep(2000);

    }

    public void SetTitle(String Title) {
        driver.findElement(By.xpath("//*[@id=\"gs_hdr_tsi\"]")).sendKeys(Title);
        driver.findElement(By.xpath("//*[@id=\"gs_hdr_tsb\"]/span/span[1]")).click();
    }


    public GoogleScholar FirstResult() {
        String t1 = driver.findElement(By.xpath("/html/body/div/div[10]/div[2]/div[2]/div[2]/div[1]/div[2]/h3/a")).getText();
        String a1 = driver.findElement(By.xpath("/html/body/div/div[10]/div[2]/div[2]/div[2]/div[1]/div[2]/div[1]")).getText();
        String i1 = driver.findElement(By.xpath("/html/body/div/div[10]/div[2]/div[2]/div[2]/div[1]/div[2]/div[2]")).getText();
        return new GoogleScholar(t1, a1, i1);
    }


    public GoogleScholar SecondResult() {

        String t2 = driver.findElement(By.xpath("/html/body/div/div[10]/div[2]/div[2]/div[2]/div[3]/div[2]/h3/a")).getText();
        String a2 = driver.findElement(By.xpath("/html/body/div/div[10]/div[2]/div[2]/div[2]/div[3]/div[2]/div[1]")).getText();
        String i2 = driver.findElement(By.xpath("/html/body/div/div[10]/div[2]/div[2]/div[2]/div[3]/div[2]/div[2]")).getText();
        return new GoogleScholar(t2, a2, i2);
    }

    public void Graph(int profondita) {
        int cont = 0;
        while (profondita != cont) {
            GoogleScholar gs1 = FirstResult();
            GoogleScholar gs2 = SecondResult();
            int id1 = AssignId(gs1.getTitle());
            int id2 = AssignId(gs2.getTitle());
            Nodes node1 = new Nodes(Integer.toString(id1), gs1.getTitle(), gs1.getAuthors(), gs1.getIntroduction());
            Nodes node2 = new Nodes(Integer.toString(id2), gs2.getTitle(), gs2.getAuthors(), gs2.getIntroduction());
            Links link1 = new Links(Integer.toString(prec), Integer.toString(id1));
            Links link2 = new Links(Integer.toString(prec), Integer.toString(id2));
            prec = id1;
            if (IdExists(id1) == false) {
                nodes.add(node1);
            }
            if (IdExists(id2) == false) {
                nodes.add(node2);
            }
            links.add(link1);
            links.add(link2);
            driver.findElement(By.xpath("/html/body/div/div[10]/div[2]/div[2]/div[2]/div[1]/div[2]/div[3]/a[3]")).click();
            cont++;

        }

    }

    public boolean IdExists(int id) {

        for (int i = 0; i < ids.size(); i++) {
            if (ids.get(i) == id) {
                return true;
            }
        }
        ids.add(id);
        return false;
    }

    public void Root() {

        String t = driver.findElement(By.xpath("/html/body/div/div[10]/div[2]/div[2]/div[2]/div[1]/div[2]/h3/a")).getText();
        String a = driver.findElement(By.xpath("/html/body/div/div[10]/div[2]/div[2]/div[2]/div[1]/div[2]/div[1]")).getText();
        String i = driver.findElement(By.xpath("/html/body/div/div[10]/div[2]/div[2]/div[2]/div[1]/div[2]/div[2]")).getText();
        int id = AssignId(t);
        Nodes node = new Nodes(Integer.toString(id), t, a, i);
        prec = id;
        nodes.add(node);
        ids.add(id);

        driver.findElement(By.xpath("/html/body/div/div[10]/div[2]/div[2]/div[2]/div[1]/div[2]/div[3]/a[3]")).click();

    }

    public int AssignId(String title) {

        if (titles.size() == 0) {
            titles.add(title);
            return 1;
        } else {
            for (int i = 0; i < titles.size(); i++) {
                if (titles.get(i).equals(title))
                    return i + 1;
            }
        }
        titles.add(title);

        return titles.size();
    }


    public Pair<ArrayList<Nodes>, ArrayList<Links>> Scraping(int profondita, String title) {

        this.SetTitle(title);
        this.Root();
        this.Graph(profondita);
        driver.close();
        Pair<ArrayList<Nodes>, ArrayList<Links>> response = new Pair<>(nodes, links);

        return response;
    }


}