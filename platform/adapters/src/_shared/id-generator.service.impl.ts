/**
 * ID Generator Service Implementation — Guardloop prefixes.
 */

import type { DomainCode } from '@guardloop/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@guardloop/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@guardloop/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  uscId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.useCase);
  }
  polId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.policy);
  }
  asmId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.assessment);
  }
  ctlId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.control);
  }
  monId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.monitoring);
  }
  rmdId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.remediation);
  }
  expId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.explanation);
  }
  rptId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.report);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
