package com.fazio.bib.Service;

import com.fazio.bib.entity.GoogleScholar;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.*;
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
    private boolean closeRoot = false;

    public ScrapingGoogleScholar() throws InterruptedException {


        System.setProperty("webdriver.gecko.driver", "src/main/resources/geckodriver.exe");
        FirefoxOptions options = new FirefoxOptions();
        options.addArguments("--window-size=1920,1200", "--ignore-certificate-errors", "--disable-extensions");
        driver = new FirefoxDriver(options);
        driver.manage().window().setPosition(new Point(0, 0));
        driver.manage().window().setSize(new Dimension(1920 / 2, 1200));
        driver.get("https://scholar.google.com/");

        Thread.sleep(2000);

    }

    public void SetTitle(String Title) throws InterruptedException {
        Thread.sleep(2000);
        driver.findElement(By.xpath("//*[@id=\"gs_hdr_tsi\"]")).sendKeys(Title);
        driver.findElement(By.xpath("//*[@id=\"gs_hdr_tsb\"]/span/span[1]")).click();
    }


    public GoogleScholar FirstResult() throws InterruptedException {
        String titolo1 = driver.findElement(By.xpath("//div[@data-rp='0']/div[@class='gs_ri']/h3")).getText();
        //secondo me non funziona
        String autori1 = driver.findElement(By.xpath("//div[@data-rp='0']/div[@class='gs_ri']/div[@class='gs_a']")).getText();
        String riassunto1 = null;
        if (driver.findElements(By.xpath("//div[@data-rp='0']/div[@class='gs_ri']/div[@class='gs_rs']")).size() != 0) {
            //Potrebbe non funzionare
            riassunto1 = driver.findElement(By.xpath("//div[@data-rp='0']/div[@class='gs_ri']/div[@class='gs_rs']")).getText();
        }

        return new GoogleScholar(titolo1, autori1, riassunto1);

    }


    public GoogleScholar SecondResult() throws InterruptedException {
        if (driver.findElements(By.xpath("//div[@data-rp='1']")).size() == 0) {
            return null;
        }
        WebElement test1 = driver.findElement(By.xpath("//div[@data-rp='1']"));

        String titolo2 = driver.findElement(By.xpath("//div[@data-rp='1']/div[@class='gs_ri']/h3")).getText();
        String autori2 = driver.findElement(By.xpath("//div[@data-rp='1']/div[@class='gs_ri']/div[@class='gs_a']")).getText();
        String riassunto2 = null;
        if (driver.findElements(By.xpath("//div[@data-rp='1']/div[@class='gs_ri']/div[@class='gs_rs']")).size() != 0) {
            riassunto2 = driver.findElement(By.xpath("//div[@data-rp='1']/div[@class='gs_ri']/div[@class='gs_rs']")).getText();
        }
        return new GoogleScholar(titolo2, autori2, riassunto2);
    }

    public void Graph(int profondita) throws InterruptedException {
        int cont = 0;
        while (profondita != cont) {
            Thread.sleep(10000);
            System.out.println(driver.getCurrentUrl());
            GoogleScholar gs1 = FirstResult();
            GoogleScholar gs2 = SecondResult();
            int id2;
            int id1 = AssignId(gs1.getTitle());
            if (gs2 == null) {
                id2 = 0;
            } else {
                id2 = AssignId(gs2.getTitle());
            }
            Nodes node1 = new Nodes(Integer.toString(id1), gs1.getTitle(), gs1.getAuthors(), gs1.getIntroduction(), driver.getCurrentUrl());
            Nodes node2 = null;
            if (id2 != 0) {
                node2 = new Nodes(Integer.toString(id2), gs2.getTitle(), gs2.getAuthors(), gs2.getIntroduction(), driver.getCurrentUrl());
            }
            Links link2 = null;
            Links link1 = new Links(Integer.toString(prec), Integer.toString(id1));
            if (id2 != 0)
                link2 = new Links(Integer.toString(prec), Integer.toString(id2));
            prec = id1;
            if (IdExists(id1) == false) {
                nodes.add(node1);
            }
            if (IdExists(id2) == false && id2 != 0) {
                nodes.add(node2);
            }
            links.add(link1);
            if (link2 != null)
                links.add(link2);
            if (driver.findElement(By.xpath("//div[@data-rp='0']/div[@class='gs_ri']/div[@class='gs_fl']/a[3]")).getText().contains("Citato") == false) {
                driver.close();
                return;
            }
            driver.findElement(By.xpath("//div[@data-rp='0']/div[@class='gs_ri']/div[@class='gs_fl']/a[3]")).click();
            cont++;

        }
        driver.close();

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

    public void Root() throws InterruptedException {

        Thread.sleep(2000);

        //Se la ricerca è vuota
        if (driver.findElements(By.xpath("//div[@data-rp='0']")).size() == 0) {
            closeRoot = true;
            driver.close();
            return;
        }

        String titolo = driver.findElement(By.xpath("//div[@data-rp='0']/div[@class='gs_ri']/h3")).getText();
        ;
        String autori = driver.findElement(By.xpath("//div[@data-rp='0']/div[@class='gs_ri']/div[@class='gs_a']")).getText();
        String riassunto = null;
        if (driver.findElements(By.xpath("//div[@data-rp='0']/div[@class='gs_ri']/div[@class='gs_rs']")).size() != 0) {
            riassunto = driver.findElement(By.xpath("//div[@data-rp='0']/div[@class='gs_ri']/div[@class='gs_rs']")).getText();
        }

        int id = AssignId(titolo);
        Nodes node = new Nodes(Integer.toString(id), titolo, autori, riassunto, driver.getCurrentUrl());
        prec = id;
        nodes.add(node);
        ids.add(id);

        WebElement firstCitation = driver.findElement(By.xpath("//div[@data-rp='0']"));
        firstCitation.findElement(By.xpath("//div[@class='gs_ri']/div[@class='gs_fl']/a[3]")).click();

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


    public void Scraping(int profondita, String title) throws InterruptedException {

        this.SetTitle(title);
        this.Root();
        if (closeRoot != true)
            this.Graph(profondita);

    }

    public ArrayList<Nodes> GetNodes() {
        return nodes;
    }

    public ArrayList<Links> GetLinks() {
        return links;
    }


}
