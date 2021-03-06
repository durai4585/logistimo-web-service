/*
 * Copyright © 2017 Logistimo.
 *
 * This file is part of Logistimo.
 *
 * Logistimo software is a mobile & web platform for supply chain management and remote temperature monitoring in
 * low-resource settings, made available under the terms of the GNU Affero General Public License (AGPL).
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along with this program.  If not, see
 * <http://www.gnu.org/licenses/>.
 *
 * You can be released from the requirements of the license by purchasing a commercial license. To know more about
 * the commercial license, please contact us at opensource@logistimo.com
 */

package com.logistimo.shipments.entity;

import com.logistimo.logger.XLog;
import com.logistimo.utils.BigUtil;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.jdo.annotations.Element;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.Join;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

/**
 * Created by Mohan Raja on 28/09/16
 */
@PersistenceCapable(identityType = IdentityType.APPLICATION, detachable = "true")
public class ShipmentItemBatch implements IShipmentItemBatch {

  private static final XLog xLogger = XLog.getLog(ShipmentItemBatch.class);

  @PrimaryKey
  @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
  private Long id;
  @Persistent
  private Long siId;
  @Persistent(table = "SHIPMENTITEMBATCH_DOMAINS", defaultFetchGroup = "true")
  @Join
  @Element(column = "DOMAIN_ID")
  private List<Long> dId;
  @Persistent
  private Long sdId;
  @Persistent
  private Long kId;
  @Persistent
  private Long mId;
  @Persistent
  private BigDecimal q;
  @Persistent
  private BigDecimal fq;
  @Persistent
  private BigDecimal dq;
  @Persistent
  private String rsn;
  @Persistent
  private String bid;
  @Persistent
  private Date bexp;
  @Persistent
  private String bmfnm;
  @Persistent
  private Date bmfdt;
  @Persistent
  private Date uOn;
  @Persistent
  private String uBy;
  @Persistent
  private Date cOn;
  @Persistent
  private String cBy;
  @Persistent
  private String fmst;
  @Persistent
  private String smst;
  @Persistent
  private String fdrsn;

  @Override
  public Long getShipmentItemId() {
    return siId;
  }

  @Override
  public void setShipmentItemId(Long siId) {
    this.siId = siId;
  }

  @Override
  public Long getDomainId() {
    return sdId;
  }

  @Override
  public void setDomainId(Long domainId) {
    sdId = domainId;
  }

  @Override
  public List<Long> getDomainIds() {
    return dId;
  }

  @Override
  public void setDomainIds(List<Long> domainIds) {
    this.dId.clear();
    this.dId.addAll(domainIds);
  }

  @Override
  public void addDomainIds(List<Long> domainIds) {
    if (domainIds == null || domainIds.isEmpty()) {
      return;
    }
    if (this.dId == null) {
      this.dId = new ArrayList<>();
    }
    for (Long dId : domainIds) {
      if (!this.dId.contains(dId)) {
        this.dId.add(dId);
      }
    }
  }

  @Override
  public void removeDomainId(Long domainId) {
    if (this.dId != null && !this.dId.isEmpty()) {
      this.dId.remove(domainId);
    }
  }

  @Override
  public void removeDomainIds(List<Long> domainIds) {
    if (this.dId != null && !this.dId.isEmpty()) {
      this.dId.removeAll(domainIds);
    }
  }

  @Override
  public Long getKioskId() {
    return kId;
  }

  @Override
  public void setKioskId(Long kId) {
    this.kId = kId;
  }

  @Override
  public Long getMaterialId() {
    return mId;
  }

  @Override
  public void setMaterialId(Long mId) {
    this.mId = mId;
  }

  @Override
  public BigDecimal getQuantity() {
    return BigUtil.getZeroIfNull(q);
  }

  @Override
  public void setQuantity(BigDecimal quantity) {
    q = quantity;
  }

  @Override
  public BigDecimal getDiscrepancyQuantity() {
    return BigUtil.getZeroIfNull(dq);
  }

  @Override
  public void setDiscrepancyQuantity(BigDecimal quantity) {
    dq = quantity;
  }

  @Override
  public BigDecimal getFulfilledQuantity() {
    return BigUtil.getZeroIfNull(fq);
  }

  @Override
  public void setFulfilledQuantity(BigDecimal quantity) {
    fq = quantity;
  }

  @Override
  public String getDiscrepancyReason() {
    return rsn;
  }

  @Override
  public void setDiscrepancyReason(String rsn) {
    this.rsn = rsn;
  }

  @Override
  public String getBatchId() {
    return bid;
  }

  @Override
  public void setBatchId(String bid) {
    this.bid = bid;
  }

  @Override
  public Date getBatchExpiry() {
    return bexp;
  }

  @Override
  public void setBatchExpiry(Date batchExpiry) {
    bexp = batchExpiry;
  }

  @Override
  public String getBatchManufacturer() {
    return bmfnm;
  }

  @Override
  public void setBatchManufacturer(String manufacturerName) {
    bmfnm = manufacturerName;
  }

  @Override
  public Date getBatchManufacturedDate() {
    return bmfdt;
  }

  @Override
  public void setBatchManufacturedDate(Date manufacturedDate) {
    bmfdt = manufacturedDate;
  }

  @Override
  public String getUpdatedBy() {
    return uBy;
  }

  @Override
  public void setUpdatedBy(String uBy) {
    this.uBy = uBy;
  }

  @Override
  public Date getUpdatedOn() {
    return uOn;
  }

  @Override
  public void setUpdatedOn(Date uOn) {
    this.uOn = uOn;
  }

  @Override
  public String getCreatedBy() {
    return cBy;
  }

  @Override
  public void setCreatedBy(String cBy) {
    this.cBy = cBy;
  }

  @Override
  public Date getCreatedOn() {
    return cOn;
  }

  @Override
  public void setCreatedOn(Date cOn) {
    this.cOn = cOn;
  }

  @Override
  public String getShippedMaterialStatus() {
    return smst;
  }

  @Override
  public void setShippedMaterialStatus(String smst) {
    this.smst = smst;
  }

  @Override
  public String getFulfilledMaterialStatus() {
    return fmst;
  }

  @Override
  public void setFulfilledMaterialStatus(String fmst) {
    this.fmst = fmst;
  }

  @Override
  public String getFulfilledDiscrepancyReason() {
    return fdrsn;
  }

  @Override
  public void setFulfilledDiscrepancyReason(String fdrsn) {
    this.fdrsn = fdrsn;
  }
}
