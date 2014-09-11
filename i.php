<?php
/**
 * Created by PhpStorm.
 * User: jary.chen
 * Date: 14-4-4
 * Time: 上午9:25
 */
define('DOME_APP','./qkmobile static html/');

$urls = array(
  /*'index'=>'http://172.16.85.120/1/m/index.html',
  'cx-qa'=>'http://172.16.85.120/1/m/cx-qa.html',
  'pg-sale'=>'http://172.16.85.120/1/m/pg-sale.html',
  'qianggoutijiao'=>'http://172.16.85.120/1/m/qianggoutijiao.html',
  'saleintro'=>'http://172.16.85.120/1/m/saleintro.html',
  'pg-us'=>'http://172.16.85.120/1/m/pg-us.html',
  'us-list'=>'http://172.16.85.120/1/m/us-list.html',
  'us-qa'=>'http://172.16.85.120/1/m/us-qa.html',*/
  
  /*'pg-cx'=>'http://172.16.85.120/1/m/pg-cx.html',
  'pg-cxover'=>'http://172.16.85.120/1/m/pg-cxover.html',
  'cx-result'=>'http://172.16.85.120/1/m/cx-result.html',
  'cx-brand'=>'http://172.16.85.120/1/m/cx-brand.html',
  'cx-contrast'=>'http://172.16.85.120/1/m/cx-contrast.html',
  'cx-addcontrast'=>'http://172.16.85.120/1/m/cx-addcontrast.html',
  
  'counselor'=>'http://172.16.85.120/1/m/counselor.html',
  'counselor-person'=>'http://172.16.85.120/1/m/counselor-person.html',

  'navact'=>'http://172.16.85.120/1/m/navact.html',
  'intention'=>'http://172.16.85.120/1/m/intention.html',
  'baoming'=>'http://172.16.85.120/1/m/baoming.html',
  'login'=>'http://172.16.85.120/1/m/login.html',
  'member'=>'http://172.16.85.120/1/m/member.html',
  'modipw'=>'http://172.16.85.120/1/m/modipw.html',
  'pdata'=>'http://172.16.85.120/1/m/pdata.html',
  'pts'=>'http://172.16.85.120/1/m/pts.html',
  'ptsrule'=>'http://172.16.85.120/1/m/ptsrule.html',
  'recommend'=>'http://172.16.85.120/1/m/recommend.html',
  'yxbaoming'=>'http://172.16.85.120/1/m/yxbaoming.html',
  'yxlists'=>'http://172.16.85.120/1/m/yxlists.html',
  'yxlist'=>'http://172.16.85.120/1/m/yxlist.html',

  'find1'=>'http://172.16.85.120/1/m/find1.html',
  'find2'=>'http://172.16.85.120/1/m/find2.html',
  'find3'=>'http://172.16.85.120/1/m/find3.html',*/
  // 'map'=>'http://172.16.85.120/1/m/map.html',
  'calc'=>'http://172.16.85.120/1/m/calc.html',
);

if(is_array($urls))
{
  foreach($urls as $key=>$val)
  {
    $url = parse_url($val);
    $html = file_get_contents($val);
    $filename = str_replace('/','',$url['path']);
    if(empty($filename))$filename = time();
    file_put_contents(DOME_APP.$key.'.html',$html);
  }
}
else
{
  $url = parse_url($urls);
  $html = file_get_contents($val);
//  $html = iconv('utf-8','gbk',$html);
  $filename = str_replace('/','',$url['path']);
  if(empty($filename))$filename = time();
  file_put_contents(DOME_APP.$filename.'_temp.html',$html);
}

?>

